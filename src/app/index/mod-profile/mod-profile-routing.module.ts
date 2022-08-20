import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModProfilePage } from './mod-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ModProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModProfilePageRoutingModule {}
