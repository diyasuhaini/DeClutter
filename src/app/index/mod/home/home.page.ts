import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { report } from '../../service/item.model';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private reports: report[];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getReport().then((list) => {
      console.log(list);
      this.reports = list.reverse();
      console.log(this.reports);
    })
  }
}
