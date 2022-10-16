import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MepagePageRoutingModule } from './mepage-routing.module';

import { MepagePage } from './mepage.page';
import { QtyFilterPipe } from './qty-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MepagePageRoutingModule
  ],
  declarations: [MepagePage, QtyFilterPipe]
})
export class MepagePageModule {}
