import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { DankUrls } from 'src/app/shared/data/dank-url.model';
import { User } from 'src/app/shared/data/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[];
/*
  private users: User[] = [
    {
        "id": 1,
        "userName": "thato",
        "password": "",
        "active": false,
        "roles": "ROLE_USER"
    },
    {
        "id": 2,
        "userName": "livha",
        "password": "",
        "active": true,
        "roles": "ROLE_USER"
    },
    {
        "id": 3,
        "userName": "fhatu",
        "password": "",
        "active": true,
        "roles": "ROLE_USER"
    },
    {
        "id": 4,
        "userName": "thembu",
        "password": "",
        "active": false,
        "roles": "ROLE_USER"
    },
    {
        "id": 5,
        "userName": "cliff",
        "password": "",
        "active": false,
        "roles": "ROLE_USER"
    }
]
*/

  constructor(private http:HttpClient,
              private loginService:LoginService) { }


  public fetchUsers(){
    const jwt = this.loginService.getJwt();
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+jwt
    })
    const url = DankUrls.baseUrl + DankUrls.deleteUserUrl;

    return this.http.get<User[]>(url, {
      headers: headers
    });
  }

  public setUser(users: User[]){
    this.users = users;
  }

  public getUsers(): User[]{
    return this.users.slice()
  }

  public getUser(id: number): User{
    return this.users[id];
  }

  public deleteUser(id: number){
    const jwt = this.loginService.getJwt();
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+jwt
    })
    const url = DankUrls.baseUrl + DankUrls.deleteUserUrl +id;
    this.http.delete(url,{
      headers:headers,
      responseType: 'text'
    }).subscribe(
      (rspData) => {
        console.log(rspData);
      }
    )
  }
}
