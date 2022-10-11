import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { report } from 'src/app/index/service/item.model';
import { ReportService } from 'src/app/index/service/report.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {

  private reports: report[];
  
  constructor(private router: Router,
              private reportService: ReportService) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.reports = [{
      reportid: "",
      description: routerState.description,
      error: routerState.error,
      screenshot: routerState.screenshot,
      username: routerState.username
    }];

    console.log(this.reports);
  }

  

}
