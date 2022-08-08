import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.page.html',
  styleUrls: ['./bag.page.scss'],
})
export class BagPage implements OnInit {

  bagcount: number = 0;
  savedcount: number = 0;
  selectedcount: number = 0;
  totalpayment: number = 0;


  constructor() { }

  ngOnInit() {
  }

}
