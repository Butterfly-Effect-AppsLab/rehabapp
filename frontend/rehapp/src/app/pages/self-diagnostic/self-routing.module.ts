import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfPage } from './self.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: "title"
  },
  {
    path: 'title',
    loadChildren: () => import('./children/title/title.module').then( m => m.TitlePageModule)
  },
  {
    path: 'diag',
    loadChildren: () => import('./children/diag-by-comp/diag-by-comp.module').then( m => m.DiagByCompPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfPageRoutingModule {}
