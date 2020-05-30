import { Component, OnInit, ElementRef } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

import { APIService } from 'src/app/services/apiservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Area, Option, Question, Diagnose, TreeComponent } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state-service.service';
import { IonRouterOutlet, NavController } from '@ionic/angular';

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {
  constructor(private api: APIService, private stateService: StateService, private router: Router, private navCtrl: NavController) {
  }

  async ngOnInit() {
    if (this.stateService.actualTreeComponent.getValue() == null) {
      await this.stateService.startLoading();
      this.router.navigate(['/selection'], {replaceUrl: true});
      return;
    }
  }

  async ionViewDidEnter() {
    await this.ngOnInit();  // trosku odrb :)
    this.stateService.stopLoading();
  }
  
  ngOnDestroy() {
  }

  async childAnswered(ref: string) {

    this.stateService.pushComponent(this.stateService.actualTreeComponent.getValue());

    this.stateService.actualTreeComponent.next(this.stateService.questions[ref])

    if(this.stateService.actualTreeComponent.getValue().type == "area"){
      await this.stateService.startLoading();
      this.router.navigateByUrl('/selection');
    }
  }

  back() {
    this.stateService.back();      
  }
}
