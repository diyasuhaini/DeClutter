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

  // refer to ionic model component 
  @ViewChild(IonModal) modal: IonModal;

  // message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmCategory() {
    this.modal.dismiss(this.name, 'confirmCategory');
  }
  confirmReport() {
    this.modal.dismiss(this.name, 'confirmReport');
  }

  onWillDismissCategory(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirmCategory') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  onWillDismissReport(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirmReport') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

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
      brand: routerState.brand,
      type: routerState.type
    }];
  }

}
