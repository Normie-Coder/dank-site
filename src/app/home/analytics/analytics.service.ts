import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Tweet } from '../tweets/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  urls = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};

model = null;
metadata = null;
PAD_INDEX = 0;
OOV_INDEX = 2;
text;
SentimentThreshold = {
  Positive: 0.66,
  Neutral: 0.33,
  Negative: 0
}

  constructor() { }

async loadTFModel(url){

  try{
    const model = await tf.loadLayersModel(url);
    console.log(model);


    return model;
  }
  catch (err){
    console.log(err);
  }

}



async loadTFMetadata(url){

  try{
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    return metadata;
  }
  catch (err){}

 // return this.http.get(url);
}

async setupSentimentModel(){
  const modelUrl = this.urls.model;
  const metaDataUrl = this.urls.metadata;

   // console.log( this.model === undefined );

    if ( !this.model){
      this.model = await this.loadTFModel(modelUrl);
    }
    if (!this.metadata){
      this.metadata = await this.loadTFMetadata(metaDataUrl);
    }

}

processTwitterData(tweets:Tweet[]): Tweet[]{
  this.setupSentimentModel().then(
    result => {
      tweets.forEach((item,index)=>{
        //console.log(item);
        const tweet_text = item.text;
        const sentiment_score = this.getSentimentScore(tweet_text);
        let tweet_sentiment = '';

        if (sentiment_score > this.SentimentThreshold.Positive){
          tweet_sentiment = 'positive';
          item.sentiment = tweet_sentiment;
        }
        else if (sentiment_score > this.SentimentThreshold.Neutral){
          tweet_sentiment = 'neutral';
          item.sentiment = tweet_sentiment;
        }
        else if (sentiment_score > this.SentimentThreshold.Negative){
          tweet_sentiment = 'negative';
          item.sentiment = tweet_sentiment;
        }
        tweets[index] = item;

      });
      //console.log(tweets);
    }

  );
  return tweets;
}

padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = this.PAD_INDEX) {
  return sequences.map(seq => {
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
}

getSentimentScore(text) {
  const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
  // Convert the words to a sequence of word indices.
  const sequence = inputText.map(word => {
    let wordIndex = this.metadata.word_index[word] + this.metadata.index_from;
    if (wordIndex > this.metadata.vocabulary_size) {
      wordIndex = this.OOV_INDEX;
    }
    return wordIndex;
  });
  // Perform truncation and padding.
  const paddedSequence = this.padSequences([sequence], this.metadata.max_len);
  const input = tf.tensor2d(paddedSequence, [1, this.metadata.max_len]);
 // console.log(this.model);
  const predictOut = this.model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();

  return score;
}


}
