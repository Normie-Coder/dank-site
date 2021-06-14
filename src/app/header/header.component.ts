import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { JwtModel } from '../shared/data/jwt.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  jwtObj: JwtModel;
  showLogout:boolean;
  isAuthenticated = false;
  jwt: string= null;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {

   // this.jwtObj = this.loginService.parseJwtObj();
    this.subscription = this.loginService.jwtSubject.subscribe(
      (rspData)=>{
        console.log(rspData);
        if (rspData){
          this.jwt = rspData;
          this.isAuthenticated =true;
        }
        else{
          this.jwtObj = null;
          this.isAuthenticated = false;
          this.loginService.getJwtModel();
        }
      }

    );
    console.log(this.isAuthenticated + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  onParseJwt(){
    if (this.router.url.startsWith('/social')){
      this.showLogout = true
    }
    else{
      this.showLogout =false;
    }
    this.jwtObj = this.loginService.parseJwtObj(this.jwt);
  }

  isUserAdmin(){
    if (this.jwtObj){
      if(this.jwtObj.role==='ROLE_ADMIN'){
        return true;
      }
      return false;
    }

    return false;
  }

  onLogout(){
    // this.jwtObj = null;
    // this.isAuthenticated = false;
    // this.loginService.clearLocalStorage();
    //this.router.navigate(['/login']);
    this.loginService.logout();
  }

  navigateToUser(){
    this.router.navigate(['/social/users']);
  }

  navigateToHelpSupport(){
    this.router.navigate(['/help-support']);
  }

  navigateToSettings(){
    this.router.navigate(['/social/setting']);
  }

}
