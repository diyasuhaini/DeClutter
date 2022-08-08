import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.page.html',
  styleUrls: ['./shopping-bag.page.scss'],
})
export class ShoppingBagPage implements OnInit {
  // inthebag: bagdata[];
  segmentValue: String = "bag";

  segmentChanged(e){
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }

  constructor() { }

  
  ngOnInit() {
    
  }

}
