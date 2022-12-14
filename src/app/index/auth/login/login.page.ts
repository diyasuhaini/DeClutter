import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  errorMsg: string = '';
  
  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 8 characters long.' 
      }
    ]
  };

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private builder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.builder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.authenticationService.signinUser(value)
      .then((response) => {
        console.log(response)
        console.log(value); //show the value current user
        localStorage.setItem('currentemail',value.email);
        if(localStorage.getItem('currentemail') == "declutter.moderator@gmail.com"){ //will change this later to latest one
          this.router.navigateByUrl('index/mod/home');
        }else{
          const auth = getAuth();
          const user = auth.currentUser;
          if(!user.emailVerified){ // if user email is not verified
            this.router.navigateByUrl('index/auth/verification'); // go to verification
          } 
          if(user.emailVerified){ // if user email is already verified
            this.router.navigateByUrl('index/home');
          }
        }
        
      }, error => {
        // this.errorMsg = error.message;
        if(error.message == "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
          this.errorMsg = "Your email or password is incorrect, please try again.";
        }else{
          this.errorMsg = "Too many fail attempt, please try again later!";
        }
      })
  }

}
