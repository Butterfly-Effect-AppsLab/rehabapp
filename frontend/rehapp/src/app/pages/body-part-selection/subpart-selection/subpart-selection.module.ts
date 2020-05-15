import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubpartSelectionPageRoutingModule } from './subpart-selection-routing.module';

import { SubpartSelectionPage } from './subpart-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubpartSelectionPageRoutingModule
  ],
  declarations: [SubpartSelectionPage]
})
export class SubpartSelectionPageModule {}
