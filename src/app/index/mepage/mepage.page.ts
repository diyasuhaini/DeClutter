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
  private userSub: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;

      //users find
    });
  }

  //get the item from database
  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }

}
