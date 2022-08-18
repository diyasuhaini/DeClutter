import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPage } from './verification.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage
  },
  {
    path: 'verified',
    loadChildren: () => import('./verified/verified.module').then( m => m.VerifiedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPageRoutingModule {}
