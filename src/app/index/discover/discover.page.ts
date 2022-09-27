import { Component, OnInit } from '@angular/core';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  private item: Item[];
  private currentid: string;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.item = [];
    this.currentid = localStorage.getItem('currentid');
  }

  ionViewWillEnter(){
    this.itemService.myItems().then((item) => {
      this.item = item;
    }, error => {
      console.log(error);
    });
  }


}
