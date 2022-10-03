import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  private segmentValue: String = "all";
  private categories: String = "unisex";
  private priceValue: boolean = false;
  private sizes: Array<String>;

  private filterForm: FormGroup;

  constructor(private itemService: ItemService, private builder: FormBuilder) { }

  segmentChanged(e){
    this.segmentValue = e.detail.value;
  }

  ngOnInit() {
    this.item = [];
    this.currentid = localStorage.getItem('currentid');
    this.filterForm = new FormGroup({
      pricetoggle: new FormControl(),
      sizecheck: new FormControl(),
      cat: new FormControl()
    });
  }
  ionViewWillEnter(){
    this.itemService.myItems().then((item) => {
      this.item = item;
    }, error => {
      console.log(error);
    });
  }

  FilterBtn(cat) {
    console.log(cat);
  }

  FilterForm(){
    this.categories = this.filterForm.value.cat;
    this.priceValue = this.filterForm.value.pricetoggle;
    this.sizes = this.filterForm.value.sizecheck;
  }

  


}
