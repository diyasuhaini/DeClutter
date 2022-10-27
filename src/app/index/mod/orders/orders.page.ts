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
  private userOrders = []; 
  private eachOrder = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  //auto get the item from database
  ionViewWillEnter(){

    //get from tracks database
    this.orderService.getTrackingdetails().then((tracks) => { //refer from item.service getItemTracking
      this.tracks = tracks; //get the value
      console.log(this.tracks);

      
      tracks.forEach((userOrders) => {
        console.log(userOrders);

        // userOrders.forEach((order) => {
        //   console.log(order);
        // });

        // this.userOrders.push(order);
        // console.log(this.userOrders);
        
        // this.eachOrder.push((userOrders) => {
        //   console.log(this.eachOrder);
        // });
      });
      
    },error => {
      console.log(error); //there is an error item.service getItemTracking
    })

  }

}

// private itemTracking = track[];
// array1 = [ ];
// array2 = [ ];


// test(val:string){
//   this.chemicals.forEach(data => {
//     return array1 = this.itemtracking."retrieve the data from each array"
//     push array1 into array2;
//   });
// }

// this.address1= 

//   {name:'', flat:'', locality:'', nickName:'' }



//   this.address.push(this.address1);

//   console.log(this.address);