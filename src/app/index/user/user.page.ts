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

  constructor(private router: Router,
              private itemService: ItemService  
    ) { }
  
  ngOnInit() {
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
  }

}
