import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  private vendor;

  constructor(private router: Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.vendor = routerState;
  }

}
