import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { report } from 'src/app/index/service/item.model';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {

  private myReport: report[];
  
  constructor(private router: Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.myReport = [{
      description: routerState.description,
      error: routerState.error,
      screenshot: routerState.screenshot,
      username: routerState.username
    }];

    console.log(this.myReport);
  }

  toReply() {
    console.log("clicked");
    this.router.navigateByUrl('index/mod/inbox/reply');
  }
}
