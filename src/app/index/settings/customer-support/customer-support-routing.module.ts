import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSupportPage } from './customer-support.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSupportPage
  },
  {
    path: 'cust-report',
    loadChildren: () => import('./cust-report/cust-report.module').then( m => m.CustReportPageModule)
  },
  {
    path: 'cust-feedback',
    loadChildren: () => import('./cust-feedback/cust-feedback.module').then( m => m.CustFeedbackPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSupportPageRoutingModule {}
