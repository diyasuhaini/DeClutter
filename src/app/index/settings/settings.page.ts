import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  //when user enter logout
  logout(){
    this.authenticationService.signoutUser()
    .then(res => {
      this.router.navigateByUrl('../auth');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
