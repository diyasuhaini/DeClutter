import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { FilterTypePipe } from './filter-type.pipe';
import { FilterNamePipe } from './filter-name.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule
  ],
  declarations: [DiscoverPage, FilterTypePipe, FilterNamePipe]
})
export class DiscoverPageModule {}
