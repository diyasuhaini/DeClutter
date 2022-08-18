import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassSetPageRoutingModule } from './pass-set-routing.module';

import { PassSetPage } from './pass-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassSetPageRoutingModule
  ],
  declarations: [PassSetPage]
})
export class PassSetPageModule {}
