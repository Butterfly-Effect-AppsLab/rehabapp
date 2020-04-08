import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagByCompPageRoutingModule } from './diag-by-comp-routing.module';

import { DiagByCompPage } from './diag-by-comp.page';
import { DiagnosticComponent } from 'src/app/components/diagnostic/diagnostic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagByCompPageRoutingModule,
    DiagnosticComponent
  ],
  declarations: [DiagByCompPage]
})
export class DiagByCompPageModule {}
