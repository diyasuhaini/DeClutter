import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database, get, getDatabase, onValue, ref as dref } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/auth.model';
import { UsersService } from '../../../service/users.service';
import { AuthenticationService } from 'src/app/authentication.service';

const storage = getStorage();
const database = getDatabase();

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  private userSub: Subscription;
  private people: User[];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    // this.people = [{
    //   contact: routerState.contact,
    //   email: routerState.email,
    //   username: routerState.username
    // }];

    //find if routerState user same as in database, display value
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      console.log(this.people);
      this.people.forEach((user) => {
        // if(user.username[0].toLowerCase() == routerState.username) {
        //   console.log(user);
        // }else {
        //   console.log("no user");
        // }
        // console.log(user);
      })
    });
  }

  ionViewWillEnter() {
    this.authenticationService.fetchUser().subscribe();
  }

  toProfile() {
    console.log("clicked");
    this.router.navigateByUrl('index/mod/users/user-details/user-profile');
  }



}


