import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { FilterReportPipe } from './filter-report.pipe';
import { FilterErrorPipe } from './filter-error.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListPage, FilterReportPipe, FilterErrorPipe]
})
export class ListPageModule {}
