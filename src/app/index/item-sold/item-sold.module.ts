import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemSoldPageRoutingModule } from './item-sold-routing.module';

import { ItemSoldPage } from './item-sold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemSoldPageRoutingModule
  ],
  declarations: [ItemSoldPage]
})
export class ItemSoldPageModule {}
