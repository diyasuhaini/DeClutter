import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingBagPage } from './shopping-bag.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingBagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingBagPageRoutingModule {}
