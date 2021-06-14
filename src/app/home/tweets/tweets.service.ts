import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DankUrls } from 'src/app/shared/data/dank-url.model';
import { AnalyticsService } from '../analytics/analytics.service';
import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  tweetsSubject = new BehaviorSubject<Tweet[]>(null);

  private  tweets: Tweet [];

  private regex = /^RT[\s\t]@[a-z\d_\-@$%\*!]+:/gi
  //private regex = /^RT$/gi

  constructor(private http: HttpClient, private analyticsService:AnalyticsService) { }

  public getTweets(jwt : string){
    const url = DankUrls.baseUrl + DankUrls.allTweetsUrl;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<Tweet>(url, {headers:headers})
  }

  public getSavedTweets(): Tweet[]{
    return this.tweets;
  }

  public setSavedTweets(tweets: Tweet[]): void{

    this.tweets = this.analyticsService.processTwitterData(tweets) ;
    this.tweetsSubject.next(this.tweets);
  }

  public sanitizeTweets(tweets: Tweet[]): Tweet[]{

    for (let tweet of tweets){
      if (this.regex.test(tweet.text)){
        tweet.text = tweet.text.replace(this.regex, '');
      }
    }
    return tweets;
  }


}
