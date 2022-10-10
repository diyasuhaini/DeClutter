import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessDonatePage } from './success-donate.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessDonatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessDonatePageRoutingModule {}
