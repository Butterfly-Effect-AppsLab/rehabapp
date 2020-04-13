import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcePageRoutingModule } from './resource-routing.module';

import { ResourcePage } from './resource.page';

import { APIService } from 'src/app/services/api.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourcePageRoutingModule
  ],
  declarations: [ResourcePage],
  providers: [APIService]
})
export class ResourcePageModule {}
