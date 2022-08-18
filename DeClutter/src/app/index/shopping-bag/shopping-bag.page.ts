import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bag, Saved } from './shopping-bag.model';
import { ShoppingBagService } from './shopping-bag.service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.page.html',
  styleUrls: ['./shopping-bag.page.scss'],
})
export class ShoppingBagPage implements OnInit {

  private bagSub: Subscription;
  private savedSub: Subscription;

  inthebag: Bag[];
  mysaved: Saved[];
  segmentValue: String = "bag";
  totalcost: number = 0;


  segmentChanged(e){
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }

  constructor(private shoppingBagService: ShoppingBagService) {  }

  
  ngOnInit() {
    this.bagSub = this.shoppingBagService.$bag.subscribe(bag => {
      this.inthebag = bag;
    });

    this.savedSub = this.shoppingBagService.$saved.subscribe(saved => {
      this.mysaved = saved;
    });

    this.inthebag.forEach(bag => {
      this.totalcost = this.totalcost + bag.price
    });

    console.log(this.inthebag.length);
  }

}
