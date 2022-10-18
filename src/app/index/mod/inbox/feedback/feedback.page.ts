import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../service/feedback.service';
import { feedback } from '../../../service/item.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  private feedbacks: feedback[];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.feedbackService.getFeedback().then((list) => {
      console.log(list);
      this.feedbacks = list.reverse();
    })
  }

}
