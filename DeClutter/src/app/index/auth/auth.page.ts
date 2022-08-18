import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service'; //authenticationservice generated manually

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  //for signup
  addUsers: FormGroup;
  msgSuccess: string = '';
  msgError: string = '';

  error_msg = {
    'username': [
      { 
        type: 'required', 
        message: 'Provide unique username.' 
      }
    ],
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
        message: 'Password length should be 6 characters long.' 
      }
    ],
    'contact': [
      { 
        type: 'required', 
        message: 'Provide contact number.' 
      },
      { 
        type: 'pattern', 
        message: 'contact number length should be 7 characters long.' 
      }
    ],
  };

  //add private router, formbuilder and authenticationService
  constructor(private router: Router,
              private authenticate: AuthenticationService,
              ) { }

  //private forms: FormBuilder - add later inside constructor
  ngOnInit() {

    //uncomment when formbuilder is inserted

    // this.addUsers = this.forms.group({
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     Validators.required
    //   ]))
    // });
  }

}
