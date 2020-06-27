import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PopoverPageModule } from './popover/popover.module';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PopoverPageModule,
    DiagnosticModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
