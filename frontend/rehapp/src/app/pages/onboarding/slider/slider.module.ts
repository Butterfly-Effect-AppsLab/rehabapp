import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SliderPageRoutingModule } from './slider-routing.module';

import { SliderPage } from './slider.page';
import { WelcomeComponent } from 'src/app/pluginzz/onboarding/welcome/welcome.component';
import { OnboardingModule } from 'src/app/pluginzz/onboarding/onboarding.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderPageRoutingModule,
    OnboardingModule
  ],
  declarations: [SliderPage]
})
export class SliderPageModule {}
