import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm){
    this.isLoading = true;
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    if (this.isLoginMode){
      this.loginService.authenticate(password, username).subscribe(
        (response) => {
          this.isLoading = false;
          if (response['jwt'] === 'fucked'){

            this.errorMessage = 'Come on Man';

          }
          else{
            this.router.navigate(['/social/tweets']);
          }


        },
        e=>{
          this.isLoading = false;
          console.log(e);
        }
      );
    }
    else {
      this.loginService.register(password, username, 'ROLE_USER', 'true').subscribe(
        (responseData)=> {
          this.isLoading = false;
        },
        (e)=>{
          this.errorMessage = 'Come on Man';
          this.isLoading = false;

        }
      )
    }
   // console.log(loginForm);

    loginForm.resetForm();
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

}
