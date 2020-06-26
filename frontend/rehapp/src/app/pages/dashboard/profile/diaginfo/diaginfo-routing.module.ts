import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaginfoPage } from './diaginfo.page';

const routes: Routes = [
  {
    path: '',
    component: DiaginfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaginfoPageRoutingModule {}
