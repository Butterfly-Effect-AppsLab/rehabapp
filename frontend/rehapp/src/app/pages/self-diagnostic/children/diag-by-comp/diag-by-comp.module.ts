import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DiagByCompPageRoutingModule } from './diag-by-comp-routing.module';

import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';

@NgModule({
  imports: [
    FormsModule,
    DiagByCompPageRoutingModule
  ]
})
export class DiagByCompPageModule {}
