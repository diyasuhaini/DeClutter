import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessDonatePageRoutingModule } from './success-donate-routing.module';

import { SuccessDonatePage } from './success-donate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessDonatePageRoutingModule
  ],
  declarations: [SuccessDonatePage]
})
export class SuccessDonatePageModule {}
