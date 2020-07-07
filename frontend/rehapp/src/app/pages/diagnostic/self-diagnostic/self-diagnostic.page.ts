import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Question } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {

  headerColor: string;

  constructor(private stateService: StateService, private router: Router) {
  }

  async ngOnInit() {
    if (this.stateService.actualTreeComponent.getValue() == null) {
      await this.stateService.startLoading();
      this.router.navigate(['/diagnostic'], { replaceUrl: true });
      return;
    }
    else {
      let question = this.stateService.actualTreeComponent.getValue() as Question;
      this.headerColor = question.style["background-color"];
    }
  }

  async ionViewDidEnter() {
    await this.ngOnInit();
    this.stateService.stopLoading();    
  }

  ngOnDestroy() {
  }

  async childAnswered(ref: string) {

    this.stateService.pushComponent(this.stateService.actualTreeComponent.getValue());

    this.stateService.actualTreeComponent.next(this.stateService.questions[ref])

    if (this.stateService.actualTreeComponent.getValue().type == "area") {
      await this.stateService.startLoading();
      this.router.navigateByUrl('/diagnostic');
    }
    else if (this.stateService.actualTreeComponent.getValue().type == "diagnose") 
      this.headerColor = "#f6f1ee"          
    else {
      let question = this.stateService.actualTreeComponent.getValue() as Question;
      this.headerColor = question.style["background-color"];
    }
  }

  back() {
    this.stateService.back();
    if (this.stateService.actualTreeComponent.getValue().type == "question") {
      let question = this.stateService.actualTreeComponent.getValue() as Question;
      this.headerColor = question.style["background-color"];
    }
  }

  redirect() {
    this.stateService.navigateToBodyPage();
  }
}
