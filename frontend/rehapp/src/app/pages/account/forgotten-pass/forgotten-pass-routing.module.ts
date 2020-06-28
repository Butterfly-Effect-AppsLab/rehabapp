import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgottenPassPage } from './forgotten-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPassPage
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPassPageRoutingModule {}
