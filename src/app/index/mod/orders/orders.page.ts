import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Tracks } from '../../service/item.model';
import { OrderService } from '../../service/order.service';
import { Subscription } from 'rxjs';
import { User } from '../../auth/auth.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  private tracks: Tracks[];
  private userOrders = []; 
  private eachOrder = [];
  private id = [];

  private trackOrder = [];

  //for user
  private userSub: Subscription;
  private people: User[];

  constructor(private orderService: OrderService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });
  }

  //auto get the item from database
  ionViewWillEnter(){

    //subcribes user
    this.authenticationService.fetchUser().subscribe();

    //get from tracks database
    this.orderService.getTracking().then((tracks) => { //refer from item.service getItemTracking
      this.tracks = tracks; //get the value
      console.log(this.tracks);
      tracks.forEach((userOrders) => {
        console.log(userOrders);
        this.people.forEach((people) => {
          if(people.id == userOrders){
            this.userOrders.push({
              'id': people.id,
            });
          }
        })
      });
      console.log(this.userOrders);
    },error => {
      console.log(error); //there is an error item.service getItemTracking
    })


    //get tracks for more details
    this.orderService.getTrackingdetails().then((details) => {
      this.eachOrder = details;
      this.userOrders.forEach((items) => {
        console.log(items);
        console.log(this.eachOrder[0])
        this.trackOrder.push(items);
        
      })
      
      
    })
    console.log(this.trackOrder);
    console.log(this.eachOrder);
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