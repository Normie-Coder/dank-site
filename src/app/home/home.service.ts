import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DankUrls } from '../shared/data/dank-url.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http:HttpClient) { }

  public getTweetByRegion(tweet: string, jwt: string){

    const url = DankUrls.baseUrl + DankUrls.tweetTopicUrl + tweet;

    console.log(jwt);

    const headers = new HttpHeaders({
      'Authorization': `Bearer `+jwt
    });

    this.http.post(url, {
      latitude:	34.052235,
	    longitude: -118.243683,
      countryName:"United States of America",
      provinceName:"California",
      cityName:"Los Angeles",
      radiusType:"km",
      radius:56.0
    },{
      headers: headers,
      responseType: 'text'
    }).subscribe(
      responseData => {
        console.log(responseData);
      }
    )

  }
}
