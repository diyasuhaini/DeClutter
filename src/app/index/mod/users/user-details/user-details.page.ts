import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toProfile() {
    console.log("clicked");
    this.router.navigateByUrl('index/mod/users/user-details/user-profile');
  }

}
