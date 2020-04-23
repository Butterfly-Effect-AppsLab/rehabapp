import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagByCompPage } from './diag-by-comp.page';
import { APIService } from 'src/app/services/api.service';

const routes: Routes = [
  {
    path: '',
    component: DiagByCompPage,
  }
];

@NgModule({
  declarations: [
  ], 
  imports: [
    RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class DiagByCompPageRoutingModule {}
