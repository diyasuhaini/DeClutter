import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { initializeApp } from 'firebase/app'; //manually added
import { environment } from 'src/environments/environment';

initializeApp(environment.firebaseConfig);

  const auth = getAuth();
  var user = auth.currentUser;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    var user = auth.currentUser;
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      // No user is signed in.
      this.router.navigate(['index/auth']);
    }

  }

  sendEmail(){
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }

  checkUser(){
    var user = auth.currentUser;
    console.log(user.emailVerified);
  }

  continue(){
    this.router.navigate(['index/']);
  }

}
