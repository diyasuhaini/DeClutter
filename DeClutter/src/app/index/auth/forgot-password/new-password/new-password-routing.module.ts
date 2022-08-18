import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPasswordPage } from './new-password.page';

const routes: Routes = [
  {
    path: '',
    component: NewPasswordPage
  },
  {
    path: 'pass-set',
    loadChildren: () => import('./pass-set/pass-set.module').then( m => m.PassSetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPasswordPageRoutingModule {}
