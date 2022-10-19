import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tracks } from '../service/item.model'; //manually imported
import { Item } from '../service/item.model'; //manually imported
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item-tracking',
  templateUrl: './item-tracking.page.html',
  styleUrls: ['./item-tracking.page.scss'],
})
export class ItemTrackingPage implements OnInit {
  
  //first picture
  myImage = "assets/img/process.gif";
  texts = document.getElementById('myText');

  private track: Tracks[]; //for tracking details
  private item: Item[]; //for item details
  private trackeditem;

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    //below for routerState
    const routerState = this.router.getCurrentNavigation().extras.state; //get current navigation
    //for retrieving track database
    this.track = [{
      trackid: "",
      orderid: routerState.orderid,
      eta: routerState.eta,
      payment: routerState.payment,
      totalprice: routerState.totalprice,
      status: routerState.status,
      quantity: routerState.quantity,
      address: routerState.address,
      items: routerState.items
    }];

    console.log(this.track);
    console.log(this.track[0].items)
    this.trackeditem = this.track[0].items;

  }

  ionViewWillEnter(){
    // //for retrieving item database
    this.itemService.retrieveItemTracking(this.trackeditem).then((bought) => {
      console.log(bought);
      this.item = bought;
    })
  }
}
