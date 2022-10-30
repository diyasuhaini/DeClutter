import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../../../../service/item.model';
import { ItemService } from '../../../../service/item.service';

@Component({
  selector: 'app-change-category',
  templateUrl: './change-category.page.html',
  styleUrls: ['./change-category.page.scss'],
})
export class ChangeCategoryPage implements OnInit {

  private item: Item[];

  changeForm: FormGroup;

  constructor(private router: Router,
              private builder: FormBuilder,
              private itemService: ItemService) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.item = [{
      itemid: "",
      vendor: routerState.vendor,
      username: routerState.username,
      img1: routerState.img1,
      img2: routerState.img2,
      img3: routerState.img3,
      title: routerState.title,
      description: routerState.description,
      price: routerState.price,
      size: routerState.size,
      color: routerState.color,
      categories: routerState.categories,
      quantity: routerState.quantity,
      orgqty: routerState.quantity,
      brand: routerState.brand,
      type: routerState.type
    }];
    console.log(this.item);

    this.changeForm = this.builder.group({
      // vendor: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // username: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      // title: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // size: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // quantity: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // price: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // orgqty: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // img1: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // img2: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // img3: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // description: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // color: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      categories: new FormControl('', Validators.compose([
        Validators.required
      ])),
      // brand: new FormControl('', Validators.compose([
      //   Validators.required
      // ]))
    })
  }

  CateAndType() {
    //change type and category in database 
    this.itemService.updateItemCateType(this.changeForm.value, this.item[0].vendor, this.item[0].title).then((changed) => {
      console.log("changed", changed);
    }).then((response) => {
      this.router.navigateByUrl('index/mod/products/product-details'); //after successful, redirect to product details page
    }, error => {
     console.log(error); //if error
    })
  }

}
