import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router, RouterState } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../../../auth/auth.model';
import { Item } from '../../../service/item.model';
import { ItemService } from '../../../service/item.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {

  //for slider
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  private item: Item[];
  private userSub: Subscription;
  private people: User[];
  private currentid: string;
  private user = [];

  constructor(private router: Router,
              private itemService: ItemService, 
              private authenticationService: AuthenticationService,
              private alertController: AlertController) { }

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
  }

  ionViewWillEnter(){
    // make sure the user is fetched before the page is rendered
    this.authenticationService.fetchUser().subscribe();
    this.user = [{
      vendor: this.item[0].vendor,
      username: this.item[0].username,
    }];
  }


}
