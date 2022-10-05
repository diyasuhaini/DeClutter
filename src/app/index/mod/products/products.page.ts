import { Component, OnInit } from '@angular/core';
import { Item } from '../../service/item.model';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  private item: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.item = [];
  }

  ionViewWillEnter() {
    this.itemService.getVendorItems().then((item) => {
      this.item = item;
      console.log(item);
    }, error => {
      console.log(error);
    });
  }

}
