import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  postItem(
    itemid: string,
    vendor: string,
    img1: string,
    img2: string,
    img3: string,
    title: string,
    description: string,
    brand: string,
    type: string
  ) {
    set(ref(database, 'item/' + itemid), {
      
    });
  }

}