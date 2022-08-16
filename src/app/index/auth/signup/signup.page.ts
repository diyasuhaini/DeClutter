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
    'Contact': [
      { 
        type: 'required', 
        message: 'Provide Contact number.' 
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
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
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
        message: 'Adding comment...'
      }).then(loadingEl => {
        loadingEl.present(); //present the loader
        this.authenticationService.addUser(
          this.addUsers.value.username,
          this.addUsers.value.potrait,
          this.addUsers.value.fullname,
          this.addUsers.value.email,
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
