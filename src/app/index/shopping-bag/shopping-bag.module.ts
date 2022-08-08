import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingBagPageRoutingModule } from './shopping-bag-routing.module';

import { ShoppingBagPage } from './shopping-bag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingBagPageRoutingModule
  ],
  declarations: [ShoppingBagPage]
})
export class ShoppingBagPageModule {}
