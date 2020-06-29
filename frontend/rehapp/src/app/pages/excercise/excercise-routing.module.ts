import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcercisePage } from './excercise.page';

const routes: Routes = [
  {
    path: '',
    component: ExcercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcercisePageRoutingModule {}
