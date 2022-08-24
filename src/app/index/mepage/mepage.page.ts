import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-mepage',
  templateUrl: './mepage.page.html',
  styleUrls: ['./mepage.page.scss'],
})
export class MepagePage implements OnInit {

  private people: User[];
  private currentusername: String;
  private userSub: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

     this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      // console.log(this.people);
      this.people.forEach((user) => {
        if (user.email == localStorage.getItem('currentemail')){
          this.currentusername = user.username;
        }
      });
    });
  }

  //get the item from database
  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }

}
