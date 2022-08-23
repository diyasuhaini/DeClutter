import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-mepage',
  templateUrl: './mepage.page.html',
  styleUrls: ['./mepage.page.scss'],
})
export class MepagePage implements OnInit {

  user = [];
  constructor(private authenticationService: AuthenticationService, private auth: Auth) { }

  ngOnInit() {
  }

}
