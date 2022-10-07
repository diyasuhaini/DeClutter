import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/index/service/report.service';
import { report } from '../../../service/item.model'; //manually imported


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private reports: report[];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getReport().then((list) => {
      console.log(list);
      this.reports = list;
    })


    // this.userSub = this.authenticationService.$users.subscribe(users => {
    //   this.people = users;
    // });
  }

}
