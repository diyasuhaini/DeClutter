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
export class DonationService {

  //current id
  private currentid;

  constructor() { }


  //get currentid
  
  //add donation
  addDonate(
    donateid: string,
    username: string,
    type: string,
    quantity: string,
    area: string,
    street: string,
    delivery: string,
    charges: string
  ){
    this.currentid = localStorage.getItem('currentid'); //get currentid
    return set(ref(database, 'donation/' + donateid),{
      username: username,
      type: type,
      quantity: quantity,
      area: area,
      street: street,
      delivery: delivery, 
      charges: charges
    })
  }

  //retrieve donation
  async getDonate(){
    const dbref = ref(database, 'donation/'); //get info from this database
    const snapshot = await get((dbref)); //retrieve its value
    var item = snapshot.val(); //get the value in other format
    var box = []; //an empty array
    if(item != null){
      Object.keys(item).forEach((newItem)=>{
        box.push(item[newItem]);
      })
    }
    return box; //completed
  }
}
 