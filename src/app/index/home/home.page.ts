import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private item: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.item = [];
    // retriving the posts
    this.itemService.myItems().then((item) => {
      var pusheditem = [];
      console.log(item);
      Object.keys(item).forEach((key) => {
        console.log(item[key].vendor + " item[key].vendor");
        pusheditem.push({"title": item[key].title, 
        "img1": item[key].img1, 
        "vendor": item[key].vendor, 
        "brand": item[key].brand,
        "description": item[key].description,
        "price": item[key].price.toFixed(2),
        "name": item[key].title});
      })
      this.item = pusheditem;
      
      // console.table(this.item);
    }, error => {
      // check error
      console.log(error);
    });
  }

  

}
