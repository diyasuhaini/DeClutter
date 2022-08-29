import { Injectable } from '@angular/core';
import { get, getDatabase, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private userSub: Subscription;
  private people: User[];
  private currentusername: String;
  private currentid: String;
  constructor(private authenticationService: AuthenticationService) { }

  // Posting item
  postItem(
    // Data type needed 
    itemid: string,
    vendor: string,
    img1: string,
    img2: string,
    img3: string,
    title: string,
    description: string,
    price: string,
    brand: string,
    type: string
    //
  ) {
    // set is firebase funciton for posting item
    return set(ref(database, 'item/' + itemid), {
      vendor: vendor,
      img1: img1,
      img2: img2,
      img3: img3,
      title: title,
      description: description,
      price: price,
      brand: brand,
      type: type
    })
  }


  getid(){
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      console.log("this.people");
      this.people.forEach((user) => {
        if (user.email == localStorage.getItem('currentemail')){
          this.currentid = user.id;
        }
      });
    });
    return this.currentid
  }

  // getting all item except current user
  async myItems(){
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      console.log("this.people");
      this.people.forEach((user) => {
        if (user.email == localStorage.getItem('currentemail')){
          this.currentid = user.id;
        }
      });
    });
    // choose which database bucket to be reference at
    var itemcontainer = [];
    const dbref = ref(database, 'item/');
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    
    Object.keys(item).forEach((key) => {
      if(item[key].vendor != this.currentid){
        
        itemcontainer.push({
          "title": item[key].title, 
          "img1": item[key].img1,
          "img2": item[key].img2,
          "img3": item[key].img3, 
          "vendor": item[key].vendor, 
          "brand": item[key].brand,
          "description": item[key].description,
          "price": item[key].price.toFixed(2),
          "name": item[key].title
        });
      }
    });
    return itemcontainer

  }

  // get current user listed item
  async getVendorItems(){
    this.getid()
    // choose which database bucket to be reference at
    var itemcontainer = [];
    const dbref = ref(database, 'item/');
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    
    Object.keys(item).forEach((key) => {
      if(item[key].vendor == this.currentid){
        
        itemcontainer.push({
          "title": item[key].title, 
          "img1": item[key].img1,
          "img2": item[key].img2,
          "img3": item[key].img3, 
          "vendor": item[key].vendor, 
          "brand": item[key].brand,
          "description": item[key].description,
          "price": item[key].price.toFixed(2),
          "name": item[key].title
        });
      }
    });
    return itemcontainer
  }

  


  

}