import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MepagePage } from './mepage.page';

const routes: Routes = [
  {
    path: '',
    component: MepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MepagePageRoutingModule {}
