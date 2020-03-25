import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreativePage } from './creative.page';

const routes: Routes = [
  {
    path: '',
    component: CreativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreativePageRoutingModule {}
