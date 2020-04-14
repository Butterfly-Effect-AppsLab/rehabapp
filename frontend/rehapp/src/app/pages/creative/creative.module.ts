import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreativePageRoutingModule } from './creative-routing.module';

import { CreativePage } from './creative.page';
import { APIService } from 'src/app/services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreativePageRoutingModule
  ],
  declarations: [CreativePage],
  providers: [APIService]
})
export class CreativePageModule {}
