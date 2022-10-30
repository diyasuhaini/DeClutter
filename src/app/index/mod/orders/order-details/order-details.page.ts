import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../auth/auth.model'; //manually imported
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  private track: User[];
  private trackdetail = [];

  constructor(private router: Router,
              private orderService: OrderService) { }

  

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.track = [{
      id: routerState.id,
      username: routerState.username,
      contact: routerState.contact,
      email: routerState.email
    }]
    console.log(this.track);
    this.track.forEach((keys) => {
      localStorage.setItem('id', keys.id);
    })
    
  }

  ionViewWillEnter(){
    this.orderService.getTrackingdetails().then((details) => {
      console.log(details);
      this.trackdetail = details;
    })
  }

}
