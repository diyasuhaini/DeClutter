import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {

    constructor() { }

    ngOnInit() {
    }

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
}
