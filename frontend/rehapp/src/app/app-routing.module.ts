import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'creative',
    loadChildren: () => import('./pages/creative/creative.module').then( m => m.CreativePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'resource',
    loadChildren: () => import('./pages/resource/resource.module').then( m => m.ResourcePageModule)
  },
  {
    path: 'self/title',
    loadChildren: () => import('./pages/self-diagnostic/title/title.module').then( m => m.TitlePageModule)
  },
  {
    path: 'self/slider',
    loadChildren: () => import('./pages/self-diagnostic/slider/slider.module').then( m => m.SliderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
