import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { FilterTypePipe } from './filter-type.pipe';
import { FilterNamePipe } from './filter-name.pipe';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { FilterPricePipe } from './filter-price.pipe';
import { FilterSizesPipe } from './filter-sizes.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiscoverPageRoutingModule
  ],
  declarations: [DiscoverPage, FilterTypePipe, FilterNamePipe, FilterCategoriesPipe, FilterPricePipe, FilterSizesPipe]
})
export class DiscoverPageModule {}
