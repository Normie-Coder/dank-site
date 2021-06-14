import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { Tweet } from '../tweets/tweet.model';
import { TweetsService } from '../tweets/tweets.service';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  subsription: Subscription;



/*
option: EChartsOption = {
  title: {
    text: 'Sentiment Analysis',
    subtext: 'Pie Chart',
    left: 'center'
  },
  backgroundColor:'#ccc'
  ,
  tooltip: {
    trigger: 'item',

  },
  legend: {
    left: 'center',
    top: 'bottom',

  },
  toolbox: {
    show: true,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      restore: {show: true},
      saveAsImage:{show: true}
    }
  },

  series: [
    {
      name: 'Chart Two',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius:5
      },
      data:[


      ]
    }
  ]

}
*/

  constructor(private tweetService: TweetsService,
              private analyticsService:AnalyticsService,
              private router:Router ) { }

  ngOnInit() {



  //let tweets = this.tweetService.getSavedTweets();

  let tweets = [
    {
        "name": "Kevin Dalton",
        "text": "This is America.\nOur founding fathers would be proud https://t.co/Y10xbMdMlA",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1153820437467373569/YJYJTZXC_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372433145539088390
    },
    {
        "name": "JSABuilder",
        "text": "https://t.co/c3fZKGP1OO #HealthAndSafety #COVID19 #Coronavirus #ScienceMatters",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/2181953193/logo_only2_normal.jpg",
        "sentiment":  "neutral",
        "tweetId": 1372432586526445569
    },
    {
        "name": "Become A Part of the Solution ...",
        "text": "RT @thejournalista: UPDATE: Deadline Apparel, the company owned by a former deputy of the Cherokee County Sheriff's Office that put out tho…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1297193550841622528/3gHoyp83_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372432413046018048
    },
    {
        "name": "monique, who is openly Black",
        "text": "UPDATE: Deadline Apparel, the company owned by a former deputy of the Cherokee County Sheriff's Office that put out those anti-Asian Covid shirts that Jay Baker so proudly advertised?\n\nThey received a PPP loan in May 2020\n\nhttps://t.co/M9YUR5TYgE",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1345887620904017921/A-_c1UJB_normal.jpg",
        "sentiment": "neutral",
        "tweetId": 1372404844950999040
    },
    {
        "name": "SalvageEarth",
        "text": "RT @thejournalista: UPDATE: Deadline Apparel, the company owned by a former deputy of the Cherokee County Sheriff's Office that put out tho…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1566287951/wangari_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372432276202663941
    },
    {
        "name": "Shaun Kronenfeld 🏳️‍⚧️",
        "text": "RT @thejournalista: UPDATE: Deadline Apparel, the company owned by a former deputy of the Cherokee County Sheriff's Office that put out tho…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1342579840361218048/xiqHJBW9_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372431876703449091
    },
    {
        "name": "Janeen Pedersen/Indivisible Leader",
        "text": "Doctors remix ‘Hamilton’ song to celebrate COVID vaccine. Watch the video https://t.co/r7290eJbir",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/916140800718733312/pk77IocL_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372431848396128259
    },
    {
        "name": "Martha Larive",
        "text": "RT @Meidas_LaurenA: 😳 Two California Coronavirus Strains Are Now Officially ‘Variants of Concern,’ Says CDC \n\nhttps://t.co/vBZpCW8uAn via @…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1365731358274777091/4QmGXFVP_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372431477695156231
    },
    {
        "name": "Lauren Ashley Davis - Meidas Mighty OG 😷🇺🇸🏴‍☠️",
        "text": "😳 Two California Coronavirus Strains Are Now Officially ‘Variants of Concern,’ Says CDC \n\nhttps://t.co/vBZpCW8uAn via @thedailybeast",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1298104297675096064/pFeCmp_T_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372394649248100355
    },
    {
        "name": "Larry Bill",
        "text": "I love how they keep taking it up a notch.   Will go spend some money here this weekend to support. https://t.co/p565YBVESk",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1257803113433460736/FB_dzJo6_normal.jpg",
        "sentiment": "positive",
        "tweetId": 1372431328545710083
    },
    {
        "name": "David Wolbert",
        "text": "RT @lapublichealth: COVID-19 vaccines are 100% free and health insurance is NOT required. For more information visit https://t.co/UVkFi7cEU…",
        "profileImageUrl": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "sentiment": "negative",
        "tweetId": 1372431286577500163
    },
    {
        "name": "LA Public Health",
        "text": "COVID-19 vaccines are 100% free and health insurance is NOT required. For more information visit https://t.co/UVkFi7cEUy https://t.co/P8Kmnysrgt",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/932650823296851968/vZPTEaVS_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372337038851145728
    },
    {
        "name": "J.",
        "text": "RT @RonBrownstein: Anyone in particular fanned those flames by repeatedly applying racist labels to the coronavirus?",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1371299783130763265/iT0MVVu4_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372430787665010688
    },
    {
        "name": "Ronald Brownstein",
        "text": "Anyone in particular fanned those flames by repeatedly applying racist labels to the coronavirus? https://t.co/F5egUJ5nuL",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/3096048418/35415ebb6897788d241c4bb4973a0fa1_normal.jpeg",
        "sentiment": "negative",
        "tweetId": 1372367027650711552
    },
    {
        "name": "Char(nee) Conklin",
        "text": "RT @TheRickyDavila: The MAGA regime and their minions such as racist fraud Peter Navarro were using “China Virus” constantly to describe th…",
        "profileImageUrl": "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "sentiment": "positive",
        "tweetId": 1372430646329577472
    },
    {
        "name": "Ricky Davila",
        "text": "The MAGA regime and their minions such as racist fraud Peter Navarro were using “China Virus” constantly to describe the Coronavirus on LIVE tv. They’re rightfully to blame for the rise of brutal violence against Asian Americans because their messaging was deliberate.",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1311455724661219330/F-P4UxGK_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372298402520653828
    },
    {
        "name": "Marianto P.",
        "text": "RT @RonBrownstein: Anyone in particular fanned those flames by repeatedly applying racist labels to the coronavirus?",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1368815166280916992/6SApIucv_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372429995658899457
    },
    {
        "name": "Oscar GallardoPT DPT",
        "text": "RT @lapublichealth: COVID-19 vaccines are 100% free and health insurance is NOT required. For more information visit https://t.co/UVkFi7cEU…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/747558194919022592/WASKjvyi_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372429535958863872
    },
    {
        "name": "W. Benjamin Turner",
        "text": "RT @thejournalista: UPDATE: Deadline Apparel, the company owned by a former deputy of the Cherokee County Sheriff's Office that put out tho…",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/1342261252777766912/KzXHhFhD_normal.jpg",
        "sentiment":"positive",
        "tweetId": 1372428209543856129
    },
    {
        "name": "León Krauze",
        "text": "RT @RonBrownstein: Anyone in particular fanned those flames by repeatedly applying racist labels to the coronavirus?",
        "profileImageUrl": "http://pbs.twimg.com/profile_images/921107324562939904/XOUzegYz_normal.jpg",
        "sentiment": "negative",
        "tweetId": 1372427176591515649
    }
]

  // this.option.series[0].data.push(this.pieChartData('Negative',tweets));
  // this.option.series[0].data.push(this.pieChartData('Neutral',tweets));
  // this.option.series[0].data.push(this.pieChartData('Positive',tweets));

/*
    this.subsription = this.tweetService.tweetsSubject.subscribe(
      (data)=>{
        console.log(data);
      }
    )
    */
  }

  filterTweets(sentiment){
    return (tweet, index)=>{
      //console.log(tweet)
      return tweet.sentiment === sentiment
    }

  }

  pieChartData(sentiment:string, tweets){
    let filteredTweet = tweets.filter(this.filterTweets(sentiment.toLowerCase()));
    //console.log(tweets);
   //console.log(filteredTweet);
     let item = {name:sentiment, value: filteredTweet.length};
      return item;
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  onChartClick(evt){

    console.log(evt);
  }

}
