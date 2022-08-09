import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service'; //authenticationservice generated manually

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  //for signup
  addUsers: FormGroup;
  msgSuccess: string = '';
  msgError: string = '';


  //add private router, formbuilder and authenticationService
  constructor(private router: Router,
              private builder: FormBuilder,
              private authenticate: AuthenticationService) { }

  ngOnInit() {
  }

}
