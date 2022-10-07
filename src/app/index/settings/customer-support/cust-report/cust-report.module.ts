import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustReportPageRoutingModule } from './cust-report-routing.module';

import { CustReportPage } from './cust-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustReportPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CustReportPage]
})
export class CustReportPageModule {}
