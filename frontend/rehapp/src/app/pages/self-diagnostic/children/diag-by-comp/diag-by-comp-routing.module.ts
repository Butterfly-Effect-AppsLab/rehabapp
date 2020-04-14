import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagByCompPage } from './diag-by-comp.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';
import { APIService } from 'src/app/services/api.service';

const routes: Routes = [
  {
    path: '',
    component: DiagByCompPage,
  }
];

@NgModule({
  declarations: [
    DiagByCompPage
  ], 
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    DiagnosticModule
    ],
  exports: [RouterModule],
  providers: [APIService]
})
export class DiagByCompPageRoutingModule {}
