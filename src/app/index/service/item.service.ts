import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

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

  async myItems(){
    // choose which database bucket to be reference at
    const dbref = ref(database, 'item/');
    // get values
    const snapshot = await get((dbref));
    return snapshot.val();
  }

}