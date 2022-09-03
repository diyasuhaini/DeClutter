import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxPage } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPage
  },  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxPageRoutingModule {}
