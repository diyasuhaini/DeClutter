import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  private resetForm: FormGroup;
  private check: boolean = false;
  private disappear: boolean = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.resetForm = this.builder.group({
      email: new FormControl(''),
    })
  }

  resetPass(value){
    console.log("lesgoooo 1");
    const auth = getAuth(); // connect to firebase auth api
    sendPasswordResetEmail(auth, value.email) // send password reset email
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("lesgoooo 2");
        this.check = true;
        if(this.check = true){
          this.disappear = true;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

}
