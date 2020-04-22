import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderPage } from './slider.page';
import { WelcomeComponent } from 'src/app/pluginzz/onboarding/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: SliderPage
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SliderPageRoutingModule {}
