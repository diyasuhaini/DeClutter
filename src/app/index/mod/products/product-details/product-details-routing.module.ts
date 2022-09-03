import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
  },
  {
    path: 'change-category',
    loadChildren: () => import('./change-category/change-category.module').then( m => m.ChangeCategoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsPageRoutingModule {}
