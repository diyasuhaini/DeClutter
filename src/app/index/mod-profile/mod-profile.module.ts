import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModProfilePageRoutingModule } from './mod-profile-routing.module';

import { ModProfilePage } from './mod-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModProfilePageRoutingModule
  ],
  declarations: [ModProfilePage]
})
export class ModProfilePageModule {}
