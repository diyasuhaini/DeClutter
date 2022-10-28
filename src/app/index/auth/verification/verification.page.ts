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
    var user = auth.currentUser; // fetch current login user
    if (user) { // if user is logged in 
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else { // if not
      // No user is signed in.
      this.router.navigate(['index/auth']); // go back to login page
    }

  }

  sendEmail(){
    sendEmailVerification(auth.currentUser) // send email verification
      .then(() => {
        // Email verification sent!
        // ...
      });
  }

  continue(){
    this.router.navigate(['index/']); // go to login
  }

}
