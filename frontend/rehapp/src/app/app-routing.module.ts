import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './services/guards/login.guard';
import { DashboardGuard } from './services/guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', canActivate: [DashboardGuard],
    loadChildren: () => import('./pages/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding-routing.module').then(m => m.OnboardingPageRoutingModule)
  },
  {
    path: 'diagnostic',
    loadChildren: () => import('./pages/self-diagnostic/self-diagnostic.module').then(m => m.SelfDiagnosticPageModule)
  },
  {
    path: 'selection',
    loadChildren: () => import('./pages/body-part-selection/body-part-selection.module').then(m => m.BodyPartSelectionPageModule)
  },
  {
    path: 'registration', canActivate: [LoginGuard],
    loadChildren: () => import('./pages/account/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login', canActivate: [LoginGuard],
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
