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
    loadChildren: () => import('./pages/onboarding/onboarding-routing.module').then(m => m.OnboardingRoutingModule)
  },
  {
    path: 'diagnostic',
    loadChildren: () => import('./pages/diagnostic/diagnostic-routing.module').then(m => m.DiagnosticRoutingModule)
  },
  {
    path: 'registration', canActivate: [LoginGuard],
    loadChildren: () => import('./pages/account/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login', canActivate: [LoginGuard],
    loadChildren: () => import('./pages/account/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'chart', 
    loadChildren: () => import('./pages/chart/chart.module').then(m => m.ChartPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then(m => m.VideoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
