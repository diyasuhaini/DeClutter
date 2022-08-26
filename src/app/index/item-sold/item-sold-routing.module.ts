import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemSoldPage } from './item-sold.page';

const routes: Routes = [
  {
    path: '',
    component: ItemSoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemSoldPageRoutingModule {}
