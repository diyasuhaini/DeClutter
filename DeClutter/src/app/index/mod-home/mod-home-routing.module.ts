import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModHomePage } from './mod-home.page';

const routes: Routes = [
  {
    path: '',
    component: ModHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModHomePageRoutingModule {}
