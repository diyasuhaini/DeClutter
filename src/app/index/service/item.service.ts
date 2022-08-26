import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";

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
      brand: brand,
      type: type
    })
  }

}