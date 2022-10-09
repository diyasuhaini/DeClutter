import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  private user = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // get current user id
    const currentid = localStorage.getItem('currentid');
    // get the router state from the previous page
    const routerState = this.router.getCurrentNavigation().extras.state;
    // turn the router state into an array
    this.user = [{
        vendor: routerState[0].vendor,
        username: routerState[0].username
    }];

    


  }

}
