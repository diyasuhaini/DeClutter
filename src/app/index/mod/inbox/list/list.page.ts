import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/index/service/report.service';
import { report } from '../../../service/item.model'; //manually imported

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private errors: String = "all";
  private errorForm: FormGroup;
  private reports = [];


  constructor(private reportService: ReportService) { }

  ngOnInit() {

    //form control
    this.errorForm = new FormGroup({
      error: new FormControl()
    });
  }

  // filter error inbox list
  filterError(){
    this.errors = this.errorForm.value.error;
  }

  ionViewWillEnter(){
    this.reportService.retrieveReport().then((list) => {
      this.reports = list;
      console.log(this.reports);
    })

  }


  

}
