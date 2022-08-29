import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth/auth.model';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';
import { Bag, Saved } from './shopping-bag.model';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.page.html',
  styleUrls: ['./shopping-bag.page.scss'],
})
export class ShoppingBagPage implements OnInit {

  // private bagSub: Subscription;
  // private savedSub: Subscription;

  // private inthebag: Bag[];
  // private mysaved: Saved[];
  private segmentValue: String = "bag";
  // private totalcost: number = 0;

  private userSub: Subscription;
  private people: User[];
  private currentid: string;
  private item: Item[];
  number1: number = 0;
  

  segmentChanged(e){
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }

  constructor(private itemService: ItemService, private authenticationService: AuthenticationService) {  }

  
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
    console.log(this.currentid);

    // this.savedSub = this.shoppingBagService.$saved.subscribe(saved => {
    //   this.mysaved = saved;
    // });

    // this.inthebag.forEach(bag => {
    //   this.totalcost = this.totalcost + bag.price
    // });

    // console.log(this.inthebag.length);
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
    this.itemService.retrieveCart().then((cart) => {
      this.item = cart;
    })
    console.table(this.item);
    this.number1 = this.item.length;
    console.log(this.number1);
  }

}
