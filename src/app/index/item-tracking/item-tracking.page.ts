import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tracks } from '../service/item.model'; //manually imported
import { Item } from '../service/item.model'; //manually imported

@Component({
  selector: 'app-item-tracking',
  templateUrl: './item-tracking.page.html',
  styleUrls: ['./item-tracking.page.scss'],
})
export class ItemTrackingPage implements OnInit {
  
  //first picture
  myImage = "assets/img/box.gif";
  texts = document.getElementById('myText');

  private track: Tracks[]; //for tracking details
  private item: Item[]; //for item details

  constructor(private router: Router) { }

  ngOnInit() {

    //below is for changing image when order item
    setTimeout(() => {
      this.myImage = 'assets/img/process.gif';
      this.texts.innerHTML = 'your order is being processed!';
      setTimeout(() => {
        this.myImage = 'assets/img/deliver.gif';
      }, 8000);
    }, 6000);


    //below for routerState
    const routerState = this.router.getCurrentNavigation().extras.state; //get current navigation
    this.track = [{
      trackid: "",
      orderid: routerState.orderid,
      eta: routerState.eta,
      payment: routerState.payment,
      totalprice: routerState.totalprice,
      status: routerState.status,
      quantity: routerState.quantity,
      items: routerState.items
    }];
  }

}
