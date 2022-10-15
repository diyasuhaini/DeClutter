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
  private saveditem: Item[];
  private number1: number = 0;
  private number2: number = 0;
  private totalcost: number = 0;
  private selectedqty = [];
  private check = 1;
  

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
  }

  // remove cart items

  remove(item, vendor){
    console.log(item);
    console.log(vendor);
    this.itemService.removeCart(item + vendor).then( () => {
      this.itemService.retrieveCart().then((cart) => {
        this.item = cart;
        this.number1 = 0;
        this.totalcost = 0;
        this.item.forEach((item) => {
          this.number1 += 1;
          this.selectedqty[this.number1] = 1;
          this.totalcost += parseFloat(item.price);
          console.log(item.price);
          console.log(item.price);
        });
      })
    });

  }

  // remove saved items

  remove2(item, vendor){
    console.log(item);
    console.log(vendor);
    this.itemService.removeSaved(item + vendor).then( () => {
      console.log("ok 1");
      this.itemService.retrieveSaved().then((cart) => {
        console.log("ok 2");
        this.saveditem = cart;
        this.number2 = 0;
        this.saveditem.forEach((item) => {
          this.number2 += 1;
        });
      })
    });

  }

  // add to saved

  async saved(title, vendor){
    await this.itemService.addtoSaved(title, vendor).then( () => {
        this.itemService.removeCart(title + vendor).then( () => {
        this.itemService.retrieveCart().then((cart) => {
          this.item = cart;
          this.number1 = 0;
          this.totalcost = 0;
          this.item.forEach((item) => {
            this.number1 += 1;
            this.totalcost += parseFloat(item.price);
            console.log(item.price);
            console.log(item.price);
          });
        })
        this.itemService.retrieveSaved().then((cart) => {
          if(cart){
            console.log("savewd", cart);
            this.saveditem = cart;
          } else {
            this.saveditem = [];
          }
          
          this.number2 = 0;
          this.saveditem.forEach((item) => {
            this.number2 += 1;
          });
        })
      })
    });
  }

  // add to cart
  async bag(title, vendor){
    const currentid = localStorage.getItem('currentid');
    await this.itemService.addtoCart(currentid, title, vendor).then( () => {
      this.itemService.removeSaved(title + vendor).then( () => {
        this.itemService.retrieveCart().then((cart) => {
          this.item = cart;
          this.number1 = 0;
          this.totalcost = 0;
          this.item.forEach((item) => {
            this.number1 += 1;
            this.selectedqty[this.number1] = 1;
            this.totalcost += parseFloat(item.price);
            console.log(item.price);
            console.log(item.price);
          });
        })
        this.itemService.retrieveSaved().then((cart) => {
          if(cart){
            console.log("savewd", cart);
            this.saveditem = cart;
          } else {
            this.saveditem = [];
          }
          
          this.number2 = 0;
          this.saveditem.forEach((item) => {
            this.number2 += 1;
          });
        })
      })
    });
  }

  add(i, qty){
    if(this.selectedqty[i] < qty){
      this.selectedqty[i]++;
      console.log("this.selectedqty[i]",this.selectedqty[i]);
      this.check++
      console.log("this.check", this.check);
    }
  }

  minus(i, qty){
    if(this.selectedqty[i] > 0){
      this.selectedqty[i]--;
      console.log("this.selectedqty[i]",this.selectedqty[i]);
      this.check--
      console.log("this.check", this.check);
    }
  }

  pushqty(){
    localStorage.setItem("selectedqty", this.selectedqty.toString());
  }




  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
    this.itemService.retrieveCart().then((cart) => {
      if(cart){
        this.item = cart;
      } else {
        this.item = [];
      }
      
      this.number1 = 0;
      this.totalcost = 0;
      this.item.forEach((item) => {
        this.selectedqty[this.number1] = 1;
        this.number1 += 1;
        this.totalcost += parseFloat(item.price);
        console.log(item.price);
        console.log(item.price);
      });
    });
    this.itemService.retrieveSaved().then((cart) => {
      if(cart){
        console.log("savewd", cart);
        this.saveditem = cart;
      } else {
        this.saveditem = [];
      }
      
      this.number2 = 0;
      this.saveditem.forEach((item) => {
        this.number2 += 1;
      });
    })

    console.log("this.selectedqty", this.selectedqty)
  }

  

}
