import { Component, OnInit } from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { Item } from '../service/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  private item: Item[];
  constructor(private router: Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.item = [{
      itemid: "",
      vendor: routerState.vendor,
      img1: routerState.img1,
      img2: "",
      img3: "",
      title: routerState.title,
      description: routerState.description,
      price: routerState.price,
      brand: routerState.brand,
      type: routerState.type
    }];
  }

  ionViewWillEnter(){
    
  }


}
