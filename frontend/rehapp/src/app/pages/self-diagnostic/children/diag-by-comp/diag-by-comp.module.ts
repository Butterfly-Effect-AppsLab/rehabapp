import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DiagByCompPageRoutingModule } from './diag-by-comp-routing.module';

import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DiagByCompPage } from './diag-by-comp.page';

@NgModule({
  declarations: [
    DiagByCompPage
  ],
  imports: [
    FormsModule,
    DiagByCompPageRoutingModule,
    IonicModule,
    CommonModule,
    DiagnosticModule
  ],
  
})
export class DiagByCompPageModule {}
