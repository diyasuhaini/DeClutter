import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {

  //add form
  donateForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  //submit button
  listDonate(){
    
  }

}
