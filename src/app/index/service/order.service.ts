import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref } from 'firebase/database';
import { environment } from 'src/environments/environment';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private trackid: String;
  private test;

  constructor() { }

  //below is for retrieve item tracking
  async getTrackingdetails(){
    const dbref = ref(database, 'item-tracking/'); //get the referrence from item tracking table (current user only)
    const snapshot = await get((dbref)); //refer back from user
    var item = snapshot.val(); //get the value
    var box = [];
    box.push(item);
    //its confirmed
    return box;
  }

  async getTracking(){
    const dbref = ref(database, 'item-tracking/'); //get the referrence from item tracking table (current user only)
    const snapshot = await get((dbref)); //refer back from user
    var item = snapshot.val(); //get the value
    var box = []; //assume there is no data
    if (item != null){ //if there is an item
      Object.keys(item).forEach((newItem) => { //match the item
        box.push(newItem); //convert 2d array into normal array
      })
    }
    return box;
  }

}
