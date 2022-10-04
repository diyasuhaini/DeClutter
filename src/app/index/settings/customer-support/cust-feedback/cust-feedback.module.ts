import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustFeedbackPageRoutingModule } from './cust-feedback-routing.module';

import { CustFeedbackPage } from './cust-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustFeedbackPageRoutingModule
  ],
  declarations: [CustFeedbackPage]
})
export class CustFeedbackPageModule {}
