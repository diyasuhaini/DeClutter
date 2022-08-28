import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';
import { User } from '../auth/auth.model';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

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

  // itemDetail(){
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       user:{
  //         id: 69,
  //         name: "sigzynine",
  //       },
  //     },
  //   };
  //   this.router.navigateByUrl('../item-details', navigationExtras);
    
  // }
    
  ionViewWillEnter(){
    this.itemService.myItems().then((item) => {
      this.item = item;
    }, error => {
      console.log(error);
    });
  }

  

}
