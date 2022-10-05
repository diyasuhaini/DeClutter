import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../auth/auth.model';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private userSub: Subscription;
  private people: User[];
  private currentusername: string;
  private currentid: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }

}
