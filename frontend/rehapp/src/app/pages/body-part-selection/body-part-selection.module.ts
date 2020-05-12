import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyPartSelectionPageRoutingModule } from './body-part-selection-routing.module';

import { BodyPartSelectionPage } from './body-part-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyPartSelectionPageRoutingModule
  ],
  declarations: [BodyPartSelectionPage]
})
export class BodyPartSelectionPageModule {}
