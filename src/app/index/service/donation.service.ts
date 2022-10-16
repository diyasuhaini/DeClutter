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

  constructor() { }

  //add donation
  addDonate(
    donateid: string,
    type: string,
    quantity: string,
    area: string,
    street: string,
    delivery: string,
    charges: string
  ){
    return set(ref(database, 'donation/' + donateid),{
      type: type,
      quantity: quantity,
      area: area,
      street: street,
      delivery: delivery,
      charges: charges
    })
  }
}
 