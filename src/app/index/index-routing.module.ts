import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'shopping-bag',
    loadChildren: () => import('./shopping-bag/shopping-bag.module').then( m => m.ShoppingBagPageModule)
  },
  {
    path: 'mepage',
    loadChildren: () => import('./mepage/mepage.module').then( m => m.MepagePageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'mod-home',
    loadChildren: () => import('./mod-home/mod-home.module').then( m => m.ModHomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
  },
  {
    path: 'alerts',
    loadChildren: () => import('./alerts/alerts.module').then( m => m.AlertsPageModule)
  },
  {
    path: 'mod-inbox',
    loadChildren: () => import('./mod-inbox/mod-inbox.module').then( m => m.ModInboxPageModule)
  },
  {
    path: 'mod-profile',
    loadChildren: () => import('./mod-profile/mod-profile.module').then( m => m.ModProfilePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
