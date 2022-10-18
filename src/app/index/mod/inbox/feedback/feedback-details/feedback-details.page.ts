import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { feedback } from 'src/app/index/service/item.model';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {
  
  private myFeedback: feedback[];

  constructor(private router: Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.myFeedback = [{
      description: routerState.description,
      username: routerState.username
    }];

    console.log(this.myFeedback);
  }
}
