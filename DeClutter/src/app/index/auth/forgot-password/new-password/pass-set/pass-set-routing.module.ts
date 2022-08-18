import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassSetPage } from './pass-set.page';

const routes: Routes = [
  {
    path: '',
    component: PassSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassSetPageRoutingModule {}
