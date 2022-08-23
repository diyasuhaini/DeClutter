import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    // children: [
    //   {
    //     path: 'home',
    //     loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
    //   },
    //   {
    //     path: 'inbox',
    //     loadChildren: () => import('../inbox/inbox.module').then( m => m.InboxPageModule)
    //   },
    //   {
    //     path: 'profile',
    //     loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
    //   },
    //   {
    //     path: '',
    //     redirectTo: '/tabs/home',
    //     pathMatch: 'full'
    //   }
    // ]
  }
  //,
  // {
  //   path: '',
  //   redirectTo: '/tabs/home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
