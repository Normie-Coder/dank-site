import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { model } from '@tensorflow/tfjs';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

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

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.text = 'RT @RonBrownstein: Anyone in particular fanned those flames by repeatedly applying racist labels to the coronavirus?';
    this.processTwitterData(this.text);
    /*
    this.loadTFMetadata(this.urls.metadata).subscribe(
      (metaDataJson)=>{
        this.metadata = metaDataJson;
       this.model= this.loadTFModel()(this.urls.model);
      // this.processTwitterData(tweet);
      }
    );
    */
  }

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

  processTwitterData(tweet:string){
    this.setupSentimentModel().then(
      result => {
        const tweet_text = tweet;
        const sentiment_score = this.getSentimentScore(tweet_text);
        console.log(sentiment_score + ' sentiment_score >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      }
    )
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
  function loadTFMetadata(url: any) {
    throw new Error('Function not implemented.');
  }

