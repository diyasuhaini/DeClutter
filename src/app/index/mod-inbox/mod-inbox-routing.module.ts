import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModInboxPage } from './mod-inbox.page';

const routes: Routes = [
  {
    path: '',
    component: ModInboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModInboxPageRoutingModule {}
