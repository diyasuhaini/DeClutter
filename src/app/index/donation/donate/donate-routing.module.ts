import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonatePage } from './donate.page';

const routes: Routes = [
  {
    path: '',
    component: DonatePage
  },
  {
    path: 'success-donate',
    loadChildren: () => import('./success-donate/success-donate.module').then( m => m.SuccessDonatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatePageRoutingModule {}
