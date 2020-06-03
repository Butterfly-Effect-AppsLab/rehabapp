import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding-routing.module').then( m => m.OnboardingPageRoutingModule)
  },
  {
    path: 'diagnostic',
    loadChildren: () => import('./pages/self-diagnostic/self-diagnostic.module').then( m => m.SelfDiagnosticPageModule)
  },
  {
    path: 'selection',
    loadChildren: () => import('./pages/body-part-selection/body-part-selection.module').then( m => m.BodyPartSelectionPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },



 
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
