import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bag, Saved } from './shopping-bag.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  private bag = new BehaviorSubject<Bag[]>([
    new Bag(
      'B1',
      'Amongus T-Shirt',
      'Amongus',
      'https://img.jakpost.net/c/2017/05/03/2017_05_03_26262_1493800897._large.jpg',
      10,
      'V1',
      'Thrifter'
    ),
    new Bag(
      'B2',
      'Duck T-Shirt',
      'none',
      'https://img.jakpost.net/c/2017/05/03/2017_05_03_26262_1493800897._large.jpg',
      15,
      'V2',
      'Duck Meister'
    )
  ]);

  private saved = new BehaviorSubject<Saved[]>([
    new Saved(
      'S1',
      'Anime T-Shirt',
      'Amongus',
      'https://img.jakpost.net/c/2017/05/03/2017_05_03_26262_1493800897._large.jpg',
      10,
      'V1',
      'Thrifter'
    ),
    new Saved(
      'S2',
      'Gamer T-Shirt',
      'none',
      'https://img.jakpost.net/c/2017/05/03/2017_05_03_26262_1493800897._large.jpg',
      15,
      'V2',
      'Duck Meister'
    )
  ]);

  get $bag(){
    return this.bag.asObservable();
  }

  get $saved(){
    return this.saved.asObservable();
  }

  constructor() { }
}
