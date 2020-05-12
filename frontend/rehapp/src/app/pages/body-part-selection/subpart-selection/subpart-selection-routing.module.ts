import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubpartSelectionPage } from './subpart-selection.page';

const routes: Routes = [
  {
    path: '',
    component: SubpartSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubpartSelectionPageRoutingModule {}
