import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcercisePageRoutingModule } from './excercise-routing.module';

import { ExcercisePage } from './excercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcercisePageRoutingModule
  ],
  declarations: [ExcercisePage]
})
export class ExcercisePageModule {}
