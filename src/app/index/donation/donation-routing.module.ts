import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationPage } from './donation.page';

const routes: Routes = [
  {
    path: '',
    component: DonationPage
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationPageRoutingModule {}
