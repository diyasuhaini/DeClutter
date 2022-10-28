import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.page.html',
  styleUrls: ['./verified.page.scss'],
})
export class VerifiedPage implements OnInit {

  private verified: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {


  }

  ionViewWillEnter() {
    var auth = getAuth();
    var user = auth.currentUser;
    console.log(user.emailVerified);
    if (user.emailVerified) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      this.verified = true;

    } else {
      // No user is signed in.
      this.router.navigate(['index/auth/verification']);
    }
  }

  continue(){
    this.router.navigateByUrl("/index/home");
  }
}
