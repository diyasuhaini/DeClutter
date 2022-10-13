import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxPage } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },  {
    path: 'reply',
    loadChildren: () => import('./reply/reply.module').then( m => m.ReplyPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxPageRoutingModule {}
