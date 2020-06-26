import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [ 
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepagePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
