import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SellPage, FileSizePipe]
})
export class SellPageModule {}
