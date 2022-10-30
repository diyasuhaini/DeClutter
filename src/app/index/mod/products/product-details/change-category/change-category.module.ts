import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCategoryPageRoutingModule } from './change-category-routing.module';

import { ChangeCategoryPage } from './change-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeCategoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeCategoryPage]
})
export class ChangeCategoryPageModule {}
