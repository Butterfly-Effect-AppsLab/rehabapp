import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagByCompPage } from './diag-by-comp.page';

const routes: Routes = [
  {
    path: '',
    component: DiagByCompPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagByCompPageRoutingModule {}
