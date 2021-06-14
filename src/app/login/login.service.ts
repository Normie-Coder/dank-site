import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import* as  CryptoJS from "crypto-js";
import { DankUrls } from 'src/app/shared/data/dank-url.model';
import jwt_decode from 'jwt-decode';
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtModel } from '../shared/data/jwt.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtSubject = new BehaviorSubject<string>(null);

  jwtModeSubject = new BehaviorSubject<JwtModel>(null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  public authenticate(password: string, username: string){
    const passwordSHA256 = this.encodePassword(password);
    const url = DankUrls.baseUrl + DankUrls.authenticateUrl;
    return this.httpClient.post( url,
    {
      username: username,
      password: passwordSHA256
    }).pipe(tap(resData => {
      this.handleAuthentication(resData['jwt']);
    }))
  }

  handleAuthentication(jwt:string){
    try{
     // console.log(jwt_decode(jwt) );
     //const jwtObj = jwt_decode(jwt);

     //this.parseDate(jwtObj['exp']);
     localStorage.setItem('jwt', jwt);
     this.jwtSubject.next(jwt);
     this.jwtModeSubject.next(this.parseJwtObj(jwt));
      return jwt_decode(jwt);
    }
    catch (Error){
      return null;
    }

  }

  getJwt(): string{
    const jwt: string = localStorage.getItem('jwt');
    const jwtObj = jwt_decode(jwt);
    if (this.checkExpiryJwt(jwtObj['exp'])){
      this.jwtSubject.next(jwt);
      return jwt;
    }
    else{
      localStorage.removeItem('jwt');
      return null;
      //this.router.navigate(['/login']);
    }

  }

  public clearLocalStorage(){
    localStorage.removeItem('jwt');
  }

  parseJwtObj(jwt: string): JwtModel{
    //const jwt = this.getJwt();
    if (jwt){
      const jwtObj = jwt_decode(jwt);
      const jwtModel = new JwtModel(jwtObj['exp'],
        jwtObj['iss'],
        jwtObj['role'],
        jwtObj['sub']
        );

        return jwtModel;
    }
    return null;
  }

  checkExpiryJwt(unixDate : number): boolean{
    let date = new Date(unixDate * 1000);

    let currentDate = new Date();

    if (+currentDate < +date){
      return true;
    }

    return false;
  }

  public encodePassword(password: string): string{
    let sha256PassObj = CryptoJS.algo.SHA256.create();
    sha256PassObj.update(password);
    const hash = sha256PassObj.finalize();
    let token = CryptoJS.enc.Base64.stringify(hash);

    return token;
  }

  public register(password:string, userName:string, role: string, active: string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const url = DankUrls.baseUrl + DankUrls.registerUrl;
    const hashedPassword = this.encodePassword(password);
    return this.httpClient.post(url, {
      userName: userName,
      password: hashedPassword,
      roles: role,
      active: active
    },
    {
      responseType: 'text'
    }
      );
  }

  public logout(){
    localStorage.removeItem('jwt');
    this.jwtModeSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getJwtModel():JwtModel{
    console.log(' getJwtModel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const jwt = this.getJwt();

    if (!jwt){
      this.logout();
    }
    else{
      return this.parseJwtObj(jwt);
    }
  }


}
