import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyPartSelectionPageRoutingModule } from './body-part-selection-routing.module';

import { BodyPartSelectionPage } from './body-part-selection.page';
import { DiagnosticModule } from 'src/app/pluginzz/diagnostic/diagnostic.module';
import { RadioListComponent } from 'src/app/pluginzz/radiolist/radiolist.component';
import { BodyModule } from 'src/app/pluginzz/diagnostic/body.module';
import { RadioListModule } from 'src/app/pluginzz/radiolist/radiolist.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyPartSelectionPageRoutingModule,
    DiagnosticModule,
    BodyModule,
    RadioListModule
  ],
  declarations: [BodyPartSelectionPage],
})
export class BodyPartSelectionPageModule {}
