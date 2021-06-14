import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/shared/data/user.model';
import { UserService } from '../user.service';

interface InterfaceRoles {
  role:string;
  active: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  //roles:InterfaceRoles[] = [{role:'user', active:false},{ role:'admin', active:false}];
  roles = ['user', 'admin'];
  activeUserOption = [true, false];
  isUserActive:boolean;
  isLoading = false;
  errorMessage = '';

  user: User;

  constructor(private userService:UserService,
              private route:ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=> {
        this.user = this.userService.getUser(+params.id);
        this.isUserActive = this.user.active;
        /*
        for (let roleObj of  this.roles){
          if (roleObj.role === this.user.roles.substr(5).toLowerCase()){
            roleObj.active = true;
          }
        }
        */
      }
    )
  }

  onSubmit(editForm: NgForm){

    //this.isLoading = true;
    const username = editForm.form.value['username'];
    const password = '';
    const active = ''+ editForm.form.value['active'];
    const roles = 'ROLE_'+ editForm.form.value['roles'].toUpperCase();

    console.log(editForm.form);

    this.loginService.register(password,
                               username,
                               roles,
                               active).
                              subscribe(
                                (rspData)=> {
                                  this.isLoading = false;
                                  console.log(rspData);
                                }, (error)=>{
                                  this.errorMessage = 'Come on Man';

                                  this.isLoading = false;
                                }
                                );


  }

}
