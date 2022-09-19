import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private user = [];
  private item: Item[];
  private follower = 0;
  private following = 0;
  private reviews = 0;

  constructor(private router: Router,
              private itemService: ItemService  
    ) { }
  
  ngOnInit() {
    this.item = [];
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.user = [
      {
        vendor: routerState[0].vendor,
        username: routerState[0].username
    }
    ];
    console.log(this.user);
  }

  ionViewWillEnter(){
    this.itemService.getUserItems(this.user[0].vendor).then((item) => {
      this.item = item;
      console.log(item);
    }, error => {
      console.log(error);
    });
  }

}
