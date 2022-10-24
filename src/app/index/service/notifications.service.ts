import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; //manually added
import { initializeApp } from 'firebase/app'; //manually added
import { get, getDatabase, ref, set } from "firebase/database"; //manually added

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
    date: string
  ){
    this.currentid = localStorage.getItem('currentid'); //get currentid
    return set(ref(database, 'notification/' + notificationid),{ //send to newly created database named 'notification'
      user: user,
      vendor: vendor,
      type: type,
      date: date
    })
  }


  //retrieve notification
  getNotification(){

  }
}
