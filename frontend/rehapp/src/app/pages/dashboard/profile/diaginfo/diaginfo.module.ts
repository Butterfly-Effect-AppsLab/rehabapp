import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaginfoPageRoutingModule } from './diaginfo-routing.module';

import { DiaginfoPage } from './diaginfo.page';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaginfoPageRoutingModule,
    DiagnosticModule
  ],
  declarations: [DiaginfoPage]
})
export class DiaginfoPageModule {}
