import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfDiagnosticPageRoutingModule } from './self-diagnostic-routing.module';

import { SelfDiagnosticPage } from './self-diagnostic.page';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfDiagnosticPageRoutingModule,
    DiagnosticModule
  ],
  declarations: [SelfDiagnosticPage]
})
export class SelfDiagnosticPageModule {}
