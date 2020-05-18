import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfDiagnosticPage } from './self-diagnostic.page';

const routes: Routes = [
  {
    path: '',
    component: SelfDiagnosticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfDiagnosticPageRoutingModule {}
