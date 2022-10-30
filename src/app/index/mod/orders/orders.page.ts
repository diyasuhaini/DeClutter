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

    //subcribes user
    this.authenticationService.fetchUser().subscribe();

    //get from tracks database
    this.orderService.getTracking().then((tracks) => { //refer from item.service getItemTracking
      tracks.forEach((userOrders) => {
        this.people.forEach((people) => {
          if(people.id == userOrders){
            this.userOrders.push({
              'id': people.id,
              'username': people.username,
              'contact': people.contact,
              'email': people.email
            });
          }
        })
      });
      console.log(this.userOrders);
    })
  }

  //auto get the item from database
  ionViewWillEnter(){
    
  }

}