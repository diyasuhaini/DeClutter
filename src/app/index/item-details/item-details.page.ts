import { Component, OnInit } from '@angular/core';
import { Router, RouterState } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth/auth.model';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';
import { get, getDatabase, onValue, ref as dref, set } from 'firebase/database';

const database = getDatabase();

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  //for slider
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  private item: Item[];
  private userSub: Subscription;
  private people: User[];
  private currentid: string;
  private user = [];
  private added = false;
  private itemtitle: string;
  private savedchecked = false;
  private vendor = [];
  private imgurl;

  //for availability
  private quantity;
  private available;

  constructor(private router: Router,
              private itemService: ItemService, 
              private authenticationService: AuthenticationService,
              private alertController: AlertController) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.quantity = routerState.quantity; //set the current quantity
    this.item = [{
      itemid: "",
      vendor: routerState.vendor,
      username: routerState.username,
      img1: routerState.img1,
      img2: routerState.img2,
      img3: routerState.img3,
      title: routerState.title,
      description: routerState.description,
      price: routerState.price,
      size: routerState.size,
      color: routerState.color,
      categories: routerState.categories,
      quantity: routerState.quantity,
      orgqty: routerState.quantity,
      brand: routerState.brand,
      type: routerState.type
    }];
    this.itemtitle = routerState.title + routerState.vendor;
    this.vendor = [{
      vendor: routerState.vendor,
      username: routerState.username
    }];

    // getting pfp Start
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      this.imgurl = (await get((dref(database, 'userpfp/' + routerState.vendor)))).val();
    });
    // getting pfp End
  }


  // add item to the Shopping Bag
  async addcart(){
    // ask the auth service for all the user
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
    
    // tell the item handling service to add the specific item to the cart
    const title = this.item[0].title;
    const vendor = this.item[0].vendor;
    this.itemService.addtoCart(this.currentid, title, vendor).then(async () => {
      this.itemService.removeSaved(title + vendor).then(async () => {
        const alert = await this.alertController.create({
          subHeader: 'Added to Shopping Bag'
        });
  
        await alert.present();
        this.added = true;
        this.savedchecked = false;
      })
    });
  }

  // Saved
  async saved(){
    const title = this.item[0].title;
    const vendor = this.item[0].vendor;
    this.itemService.addtoSaved(title, vendor).then(async () => {
      this.itemService.removeCart(title + vendor).then(async () => {
        this.added = false;
        this.savedchecked = true;
        // alert the user the item is saved
        const alert = await this.alertController.create({
          subHeader: 'Item is Saved'
        });

        await alert.present();

      })
      
    })

  }

  unsaved(){
    const title = this.item[0].title;
    const vendor = this.item[0].vendor;
    this.itemService.removeSaved(title + vendor).then(async () => {
      this.savedchecked = false;
       // alert the user the item is saved
       const alert = await this.alertController.create({
        subHeader: 'Item is remove from saved'
      });

      await alert.present();
    })
  }

  ionViewWillEnter(){
    // make sure the user is fetched before the page is rendered
    this.authenticationService.fetchUser().subscribe();
    this.user = [{
      vendor: this.item[0].vendor,
      username: this.item[0].username,
    }];
    this.itemService.antiDuplicate(this.itemtitle).then((item) => 
      this.added = item
    );
    this.itemService.antiDuplicateSaved(this.itemtitle).then((item) => 
      this.savedchecked = item
    );

    if(this.quantity == "0"){
      this.available = true;
    }
    
  }


}
