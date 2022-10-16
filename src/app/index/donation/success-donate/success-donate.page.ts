import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-donate',
  templateUrl: './success-donate.page.html',
  styleUrls: ['./success-donate.page.scss'],
})
export class SuccessDonatePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toHome(){
    this.router.navigateByUrl('index/home');
  }

}
