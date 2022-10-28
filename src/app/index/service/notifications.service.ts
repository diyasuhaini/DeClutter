import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; //manually added
import { initializeApp } from 'firebase/app'; //manually added
import { get, getDatabase, ref, set } from "firebase/database"; //manually added
import { Item } from './item.model';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  //current id variable
  private currentid;

  constructor() { }

  //add notification
  addNotification(
    notificationid: string,
    user: string,
    vendor: string,
    type: string,
    item: string,
    date: string,
    img: string
  ){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var finaldate = mm + '/' + dd + '/' + yyyy;
    this.currentid = localStorage.getItem('currentid'); //get currentid
    return set(ref(database, 'notification/' + notificationid),{ //send to newly created database named 'notification'
      user: user,
      vendor: vendor,
      type: type, //purchased, reviewed, message, or followed
      item: item,
      date: finaldate,
      img: img
    })
  }


  //retrieve notification
  async getNotification(){
    const dbref = ref(database, 'notification'); //check the database
    const snapshot = await get((dbref)); //retrieve its value
    var item = snapshot.val(); //get the value in other format
    var box = []; //an empty array
    var current = localStorage.getItem('currentname');
    if(item != null){
      Object.keys(item).forEach((newItem)=>{
        if(current == item[newItem].vendor){
          box.push(item[newItem]);
        }
      })
    }
    return box; //completed
  }
}
