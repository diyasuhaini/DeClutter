import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth/auth.model';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item-sold',
  templateUrl: './item-sold.page.html',
  styleUrls: ['./item-sold.page.scss'],
})
export class ItemSoldPage implements OnInit {

  private userSub: Subscription;
  private people: User[];
  private currentid: string;
  private item: Item[];
  private number1: number = 0;
  private totalcost: number = 0;
  private shipping: number = 0;
  private discount: number = 1;
  private discountprice: number = 0;
  private finaltotal: number = 0;

  constructor(private itemService: ItemService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

     this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentid = user.id;
        }
      });
    });
  }


  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
    this.itemService.retrieveCart().then((cart) => {
      this.item = cart;
      this.number1 = 0;
      this.totalcost = 0;
      this.finaltotal = 0;
      this.item.forEach((item) => {
        this.number1 += 1;
        this.totalcost += parseFloat(item.price);
      });
      this.finaltotal = (this.totalcost + this.shipping)/ this.discount;
      var mytotal;
      mytotal = this.finaltotal * 0.71699;
      var convertTotal = parseFloat(mytotal).toFixed(2);
      //total item send to localstorage
      localStorage.setItem("totalPrice", convertTotal);
      console.log(this.item);
    })
  }

}
