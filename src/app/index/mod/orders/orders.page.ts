import { Component, OnInit } from '@angular/core';
import { Tracks } from '../../service/item.model';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  private tracks: Tracks[];
  private orders = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  //auto get the item from database
  ionViewWillEnter(){

    //get from tracks database
    this.orderService.getTrackingdetails().then((tracks) => { //refer from item.service getItemTracking
      this.tracks = tracks; //get the value
      console.log(this.tracks);
      // tracks.forEach((order) => {
      //   console.log(order);
      // });
    },error => {
      console.log(error); //there is an error item.service getItemTracking
    })

  }

}
