import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private item: Item[];
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    
  }
    
  ionViewWillEnter(){
    this.itemService.myItems().then((item) => {
      this.item = item;
    }, error => {
      console.log(error);
    });
  }

  

}
