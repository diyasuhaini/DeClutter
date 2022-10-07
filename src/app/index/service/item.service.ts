import { Injectable } from '@angular/core';
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model'
import { strict } from 'assert';

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

  //below for get all items for moderator
  async getItems(){
    var items = []; //creating an empty array first
    const dbref = ref(database, 'item/'); //get item information from database
    const snapshot = await get((dbref)); //refer from dbref
    var allItem = snapshot.val(); //get the value
    Object.keys(allItem).forEach((key) => {
      items.push({
        "title": allItem[key].title,
        "img1": allItem[key].img1,
        "img2": allItem[key].img2,
        "img3": allItem[key].img3, 
        "vendor": allItem[key].vendor,
        "username": allItem[key].username, 
        "brand": allItem[key].brand,
        "description": allItem[key].description,
        "price": allItem[key].price.toFixed(2),
        "size": allItem[key].size,
        "color": allItem[key].color,
        "categories": allItem[key].categories,
        "quantity": allItem[key].quantity,
        "name": allItem[key].title
      })
    })
    
    return items
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
    const snapshot = await get((dbref)); //get all data from ref
    var item = snapshot.val(); //retrieve value
    var lock = false; //no user
    if(!item){
      if(item[currentid]){ //if user
        item[currentid].forEach((item1)  => { //every item from user
          if (item1 == (title + vendor)){  //combine title with vendor
            lock = true; //item is correct
          }
  
          if(lock == false){ //else incorrect
            item[currentid].push((title + vendor)); //push to shopping-bag
            return set(ref(database, 'shopping-bag/'), item); //then its confirmed
          }
        });
      } else { 
        return set(ref(database, 'shopping-bag/'+ currentid), [(title + vendor)]);
      }
    }
    return set(ref(database, 'shopping-bag/'+ currentid), [(title + vendor)]);

  
  }

  async addtoSaved(title, vendor) {
    const currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'saved/');
    // get values
    const snapshot = await get((dbref)); //get all data from ref
    var item = snapshot.val(); //retrieve value
    var lock = false; //no user
    if(!item){
      this.removeCart(title + vendor).then(() => {
        return set(ref(database, 'saved/'+ currentid), [(title + vendor)]);
      })
    }

    if(item[currentid]){ //if user
      item[currentid].forEach((item1)  => { //every item from user
        if (item1 == (title + vendor)){  //combine title with vendor
          lock = true; //item is correct
        }

        if(lock == false){ //else incorrect
          item[currentid].push((title + vendor)); //push to saved
          this.removeCart(title + vendor).then(() => {
          return set(ref(database, 'saved/'), item); //then its confirmed
          })
        }
      });
    } else { 
      this.removeCart(title + vendor).then(() => {
        return set(ref(database, 'saved/'+ currentid), [(title + vendor)]);
      })
    }

  
  }


  //for display
  async retrieveCart(){
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'shopping-bag/' + currentid);
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    var cont = [];
    if (item != null){
      item.forEach((item) => {
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
    }
    
    return cont3;
  }

  async antiDuplicate(item){
    var trigger = false;
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'shopping-bag/' + currentid);
    const snapshot = await get((dbref));

    var items = snapshot.val();
    if(!items){
      return trigger
    }
    items.forEach((item2) => {
      console.log(item2);
      if (item2 == (item)) { 
        trigger = true;
      }
    });
    return trigger
  }

  async removeCart(itemid){
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'shopping-bag/' + currentid);
    const snapshot = await get((dbref));
    console.log(snapshot.val());
    var cont = [];
    snapshot.val().forEach((item) => {
      if(item != itemid){
        cont.push(item);
      }
    })
    return set(dbref, cont);
  }

  async removeSaved(itemid){
    var currentid = localStorage.getItem('currentid');
    const dbref = ref(database, 'Saved/' + currentid);
    const snapshot = await get((dbref));
    console.log(snapshot.val());
    var cont = [];
    snapshot.val().forEach((item) => {
      if(item != itemid){
        cont.push(item);
      }
    })
    return set(dbref, cont);
  }

  //item tracking part below

  //below for add tracking item
  async addItemTracking(){
    //get the referrence from created database
    var currentid = localStorage.getItem('currentid'); //only you can see
    
    const dbrefTrack = ref(database, 'item-tracking/' + currentid); //get the referrence
    const getLength = await get((dbrefTrack)); //refer back from user
    var trackid; //for initial
    var cont = [];
    if(getLength.val() == null){ //if no value
      trackid = 101; //add value (start with 101)
    }else{ //if value existed
      Object.keys(getLength.val()).forEach(index => cont.push(getLength.val()[index])); // for each by getting its index then pushing
      trackid = cont.length + 101; // container length plus 101 aka the starting point
    }

    //payment method
    var payMethod = localStorage.getItem('method'); //retrieve from localstorage
    const dbref = ref(database, 'item-tracking/' + currentid + '/' + currentid + '&' + trackid); //get the referrence (new)
    //add date, payment method, status
    
    var payMethod = localStorage.getItem('method'); //retrieve value from localstorage
    const snapshot = await get((dbref)); //refer back from user
    var item = snapshot.val(); //get the value
      const dbref2 = ref(database, 'shopping-bag/' + currentid); //refer back from item
      const snapshot2 = await get((dbref2)); //refer from user
      var item = snapshot2.val(); //get the value

      //create orderid with random number
      var randomNumber; //empty randomNumber
      var storeNumber;
      var randomValue = Math.floor(1000 + Math.random() * 2000); //get random value
      storeNumber = randomValue;
      localStorage.setItem('orderid', storeNumber); //insert into localstorage
      randomNumber =  localStorage.getItem('orderid');//get previous number from localstorage
      if(randomNumber != randomValue){ //check if the number is not equal to previous number
        randomNumber.push(randomValue); //if not equal then push
        return randomValue; //confirmed
      }else{
        randomNumber = Math.floor(1000 + Math.random() * 9000); //make new randomnumber
      }

      //get total price
      var myTotal = parseFloat(localStorage.getItem('totalPrice')) / 0.717;

      //push to database
      var trackBox = []; //new box for track
      trackBox['orderid'] = '#' + randomNumber;
      trackBox['payment'] = payMethod; //[name] = value
      trackBox['status'] = 'pending';
      trackBox['eta'] = '6 days';
      trackBox['items'] = item;
      trackBox['totalprice'] = myTotal.toFixed(2);
      console.log(trackBox);
      return set(dbref, trackBox); //for transfer 
  }

  //below is for retrieve item tracking
  async getItemTracking(){
    var currentid = localStorage.getItem('currentid'); //only you can see
    const dbref = ref(database, 'item-tracking/' + currentid); //get the referrence from item tracking table (current user only)
    const snapshot = await get((dbref)); //refer back from user
    var item = snapshot.val(); //get the value
    var box = []; //assume there is no data
    if (item != null){ //if there is an item
      Object.keys(item).forEach((newItem) => { //match the item
        box.push(newItem); //convert 2d array into normal array
      })
      const dbref2 = ref(database, 'item-tracking/' + currentid); //refer back from item
      const snapshot2 = await get((dbref2)); //refer from user
      var itemDetails = snapshot2.val(); //get the value
  
      var newBox = []; //new box appear
      Object.keys(itemDetails).forEach((key) => { //insert into 2d array (converted array)
        box.forEach((newItem) => { //match the item
          if (key == newItem) { //if the item is matched
            newBox.push(itemDetails[key]); //insert current index of converted array data into new container (newBox)
          }
        })
      })
      
    }
    //its confirmed
    return newBox;
  }

  //below is for when itemTracking succesfully added, clear shopping bag (current user)
  async clearCart(){
    var currentid = localStorage.getItem('currentid'); //get currentid from localstorage
    const dbref = ref(database, 'shopping-bag/' + currentid); //get the referrence from item tracking table (current user only)
    return set(dbref, null);
  }


  async retrieveItemTracking(items){
    var currentid = localStorage.getItem('currentid'); //only you can see
    const itemdref = ref(database, "item/"); //refer from database item
    const snapshot = await get((itemdref)); //refer from itemdref
    const itemdetails = snapshot.val(); //get the value
    console.log("itemdetails", itemdetails); //checking itemdetails
    console.log("items", items); //checking items
    var container = []; //empty container

    Object.keys(itemdetails).forEach((key) => { //match each item from itemdetails
      items.forEach((trackeditem) => { //match each item form items
        if(trackeditem == (itemdetails[key].title+itemdetails[key].vendor)){ //check if itemdetails matched with trackeditem
          container.push(itemdetails[key]); //push to empty container
        }
      })     
    })
    
    // its confirmed
    console.log("container", container); //check value
    return container; //confirmed
  }


  //below for retrieve user database
  async retrieveAccount(){
    var currentid = localStorage.getItem('currentid'); //only you can see
    const accountref = ref(database, "user/" + currentid); //refer from database for user
    const snapshot = await get((accountref)); //refer accountref
    const accountDetails = snapshot.val(); //get the value for account
    console.log(accountDetails);

    var accounts = []; //new box appear
    Object.keys(accountDetails).forEach(() => {
      accounts.push(accountDetails);
    })

    return accounts; //completed
  }


  //below is for updating user account
  async updateAccount(){
    //below is for retrieving current data
    var currentid = localStorage.getItem('currentid'); //only you can see
    const accountref = ref(database, "user/" + currentid); //refer from database for user
    const snapshot = await get((accountref)); //refer accountref
    const accountDetails = snapshot.val(); //get the value for account
    console.log(accountDetails);

    //below is for pushing new to current data
    var accountBox = []; //created an empty array
    Object.keys(accountDetails).forEach(() => {
      accountBox.push({
        username: accountDetails.username,
        fullname: localStorage.getItem('currentid'),
        email: accountDetails.email,
        contact: accountDetails.contact,
        address1: 'testing',
        address2: 'testing'
      })
    })

    //completed
    return accountBox;
  }



}