import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
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
    var currentid = localStorage.getItem('id'); //only you can see
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
    return newBox;
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
    console.log(box);
    return box;
  }

  async approveTracking(order, id){
    const dbref = ref(database, 'item-tracking/' + id); //get the referrence from item tracking table (current user only)
    const snapshot = (await get((dbref))).val(); //refer back from user
    console.log("snapshot", snapshot);
    Object.keys(snapshot).forEach((key) => {
      console.log("key", key);
      if(snapshot[key].orderid == order){
        return set(ref(database, 'item-tracking/' + id + "/" + key + "/status"), "completed");
      }
    })
  }

}
