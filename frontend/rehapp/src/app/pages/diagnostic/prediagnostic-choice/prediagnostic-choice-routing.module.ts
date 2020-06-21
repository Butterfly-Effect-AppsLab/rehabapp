import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrediagnosticChoicePage } from './prediagnostic-choice.page';

const routes: Routes = [
  {
    path: '',
    component: PrediagnosticChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrediagnosticChoicePageRoutingModule {}
