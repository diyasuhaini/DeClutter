import { Injectable } from '@angular/core';
import { get, getDatabase, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { serialize } from 'v8';

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
    username: string,
    img1: string,
    img2: string,
    img3: string,
    title: string,
    description: string,
    price: string,
    size: string,
    color: string,
    categories: string,
    brand: string,
    type: string
    //
  ) {
    // set is firebase funciton for posting item
    return set(ref(database, 'item/' + itemid), {
      vendor: vendor,
      username: username,
      img1: img1,
      img2: img2,
      img3: img3,
      title: title,
      description: description,
      price: price,
      size: size,
      color: color,
      categories: categories,
      brand: brand,
      type: type
    })
  }


  getid(){
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentid = user.id;
          this.currentusername = user.username;
        }
      });
    });
    return this.currentid
  }

  // getting all item except current user
  async myItems(){
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentid = user.id;
          this.currentusername = user.username;
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
          "username": item[key].username, 
          "brand": item[key].brand,
          "description": item[key].description,
          "price": item[key].price.toFixed(2),
          "size": item[key].size,
          "color": item[key].color,
          "categories": item[key].categories,
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
          "username": item[key].username, 
          "brand": item[key].brand,
          "description": item[key].description,
          "price": item[key].price.toFixed(2),
          "size": item[key].size,
          "color": item[key].color,
          "categories": item[key].categories,
          "name": item[key].title
        });
      }
    });
    return itemcontainer
  }

  


  

}