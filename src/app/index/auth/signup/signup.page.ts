import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  //form
  addUsers: FormGroup;
  users: User[];
  successMsg: string = '';
  errorMsg: string = '';

  //error text
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
        message: 'Provide unique username.' 
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
    ],
    'contact': [
      { 
        type: 'required', 
        message: 'Contact number is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Contact number is not valid' 
      }
    ]
  };

  //add private router
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private builder: FormBuilder,
              private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.addUsers = this.builder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      contact: new FormControl('', Validators.compose([
        Validators.minLength(13),
        Validators.required
      ])),
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

  signUp(value) {
    this.authenticationService.createUser(value)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "New user created.";
        this.router.navigateByUrl('index/auth');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      });

      //add to firebase data
      if(!this.addUsers.valid){ //check validity
        this.return;
      }
      //access
      this.loadCtrl.create({
        message: 'Please wait for a moment...'
      }).then(loadingEl => {
        loadingEl.present(); //present the loader
        this.authenticationService.addUser(
          this.addUsers.value.username,
          this.addUsers.value.email,
          this.addUsers.value.contact,
        ).subscribe(() => {
          loadingEl.dismiss();
          this.addUsers.reset();
          this.router.navigate(['index/auth']);
        })
      })

  }

  //return to previous page
  return(){
    this.router.navigateByUrl("/index/auth");
  }

}
