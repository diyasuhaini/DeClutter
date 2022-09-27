import { Injectable } from '@angular/core';
import { get, getDatabase, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model'

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
    quantity: string,
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
      quantity: quantity,
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
    this.currentid = localStorage.getItem('currentid');
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
          "quantity": item[key].quantity,
          "name": item[key].title,
          "type": item[key].type
        });
      }
    });
    return itemcontainer

  }

  // get current user listed item
  async getVendorItems(){
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
          "quantity": item[key].quantity,
          "name": item[key].title
        });
      }
    });
    return itemcontainer
  }

  async getUserItems(currentuser){
    // choose which database bucket to be reference at
    var itemcontainer = [];
    const dbref = ref(database, 'item/');
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    
    Object.keys(item).forEach((key) => {
      if(item[key].vendor == currentuser){
        
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
          "quantity": item[key].quantity,
          "name": item[key].title
        });
      }
    });
    return itemcontainer
  }

  async addtoCart(currentid, title, vendor) {
    const dbref = ref(database, 'shopping-bag/');
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    var lock = false;
    if(item[currentid]){
      item[currentid].forEach((item1)  => {
        if (item1 == (title + vendor)){
          lock = true;
        }

        if(lock == false){
          item[currentid].push((title + vendor));
          return set(ref(database, 'shopping-bag/'), item);
        }
      });
    } else {
      return set(ref(database, 'shopping-bag/'+ currentid), [(title + vendor)]);
    }

  
  }

  async retrieveCart(){
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'shopping-bag/');
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    var cont = [];
    item[currentid].forEach((item) => {
      cont.push(item);
    })
    const dbref2 = ref(database, 'item/');
    const snapshot2 = await get((dbref2));
    var item2 = snapshot2.val();

    var cont3 = [];
    Object.keys(item2).forEach((key) => {
      cont.forEach((item) => {
        if (key == item) {
          cont3.push(item2[key]);
        }
      })

      
    })
    return cont3;

  }

  async antiDuplicate(item){
    var trigger = false;
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'shopping-bag/' + currentid);
    const snapshot = await get((dbref));

    var items = snapshot.val();
    items.forEach((item2) => {
      console.log(item2);
      if (item2 == (item)) { 
        trigger = true;
      }
    });
    return trigger
  }

  


  

}