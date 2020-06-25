import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyPartSelectionPage } from './body-part-selection.page';

const routes: Routes = [
  {
    path: '',
    component: BodyPartSelectionPage
  }
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyPartSelectionPageRoutingModule {}
