import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrediagnosticChoicePageRoutingModule } from './prediagnostic-choice-routing.module';

import { PrediagnosticChoicePage } from './prediagnostic-choice.page';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrediagnosticChoicePageRoutingModule,
    DiagnosticModule
  ],
  declarations: [PrediagnosticChoicePage]
})
export class PrediagnosticChoicePageModule {}
