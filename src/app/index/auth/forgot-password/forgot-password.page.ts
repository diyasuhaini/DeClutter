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

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.resetForm = this.builder.group({
      email: new FormControl(''),
    })
  }

  resetPass(value){
    console.log("lesgoooo 1");
    const auth = getAuth();
    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("lesgoooo 2");
        this.check = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

}
