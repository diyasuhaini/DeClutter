import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModHomePageRoutingModule } from './mod-home-routing.module';

import { ModHomePage } from './mod-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModHomePageRoutingModule
  ],
  declarations: [ModHomePage]
})
export class ModHomePageModule {}
