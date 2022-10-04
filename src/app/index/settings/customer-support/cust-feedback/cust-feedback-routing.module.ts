import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustFeedbackPage } from './cust-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: CustFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustFeedbackPageRoutingModule {}
