import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingBagPage } from './shopping-bag.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingBagPage
  },
  {
    path: 'my-bag',
    loadChildren: () => import('./my-bag/my-bag.module').then( m => m.MyBagPageModule)
  },
  {
    path: 'saved',
    loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingBagPageRoutingModule {}
