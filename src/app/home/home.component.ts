import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchText=''
  jwt ='';
  subscription: Subscription;

  constructor(private loginService:LoginService, private homeService: HomeService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription= this.loginService.jwtSubject.subscribe(
      (jwt)=>{
        this.jwt = jwt;

      }
    )
  }

  onSearchClick(){
    this.homeService.getTweetByRegion(this.searchText, this.jwt);
  }

}
