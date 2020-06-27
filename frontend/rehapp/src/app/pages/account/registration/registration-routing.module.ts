import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPage } from './registration.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
