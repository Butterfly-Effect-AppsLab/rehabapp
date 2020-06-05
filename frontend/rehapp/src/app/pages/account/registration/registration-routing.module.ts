import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPage } from './registration.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },
  {
    path: 'demography',
    loadChildren: () => import('./demography/demography.module').then( m => m.DemographyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
