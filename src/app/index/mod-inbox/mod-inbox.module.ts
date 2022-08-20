import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModInboxPageRoutingModule } from './mod-inbox-routing.module';

import { ModInboxPage } from './mod-inbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModInboxPageRoutingModule
  ],
  declarations: [ModInboxPage]
})
export class ModInboxPageModule {}
