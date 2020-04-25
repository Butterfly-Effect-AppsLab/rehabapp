import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'slider'
  },
  {
    path: 'slider',
    loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
