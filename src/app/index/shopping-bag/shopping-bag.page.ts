import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.page.html',
  styleUrls: ['./shopping-bag.page.scss'],
})
export class ShoppingBagPage implements OnInit {

  bagcount: number = 0;
  savedcount: number = 0;
  selectedcount: number = 0;

  constructor() { }

  ngOnInit() {

  }

}
