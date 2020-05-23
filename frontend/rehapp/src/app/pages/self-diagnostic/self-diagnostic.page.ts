import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

import { APIService } from 'src/app/services/apiservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Area, Option, Question, Diagnose } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {

  public type: string = "";
  public questionForChild: Question;
  public diagnoseForChild: Diagnose;

  public subscription: Array<Subscription> = [];
  startingState: Question;
  componentStack: Array<Question> = [];

  constructor(private api: APIService, private stateService: StateService) {}

    // this.route.queryParams.pipe(
    //   switchMap(() => {
    //     if (this.router.getCurrentNavigation().extras.state) {
    //       this.tree = this.router.getCurrentNavigation().extras.state.tree;
    //       this.subpart = this.router.getCurrentNavigation().extras.state.subpart;
    //       return of(null);
    //     }

    //     return this.getTreeFromAPI().pipe(map(() => {
    //       console.log("subpart:");
    //       console.log(this.subpart);
    //       console.log("tree:");
    //       console.log(this.tree);
    //       return "";
    //     }));
    //   }))
    //   .subscribe(
    //     // jeden z returnov
    //   );


    async ngOnInit() {

      await this.api.getTree();      
      console.log(this.api.questions);
          
      this.stateService.actualSubpart.next(this.api.questions["q_33"]);
      this.start();
    }

    // this.stateService.actualSubpart.pipe(
    //   map(state => { this.startingState = state })
    // ).subscribe();
  

  // async const(){
  //   console.log("before: " + this.tree);    
  //   let response = await this.getTreeFromAPI().toPromise();

  //   console.log("after: ", response);    
  //   console.log("nieco");    
  // }

  ngOnDestroy() {
    this.subscription.forEach(
      (subscribe) => subscribe.unsubscribe()
    );
  }

  start() {
    this.type = "Question";
    this.questionForChild = this.stateService.actualSubpart.getValue();
    this.componentStack.push(this.questionForChild);
  }

  childAnswered(id: string){

    this.componentStack.push(this.questionForChild);
    
    if (id.startsWith('q')){      
      this.type = "Question";
      this.questionForChild = this.api.questions[id];
    }
    if (id.startsWith('d')){
      this.type = "Diagnose";
      this.diagnoseForChild = this.api.questions[id];
    }
  }

  back() {
    this.type = "Question";
    if (this.componentStack.length > 0)
      this.questionForChild = this.componentStack.pop();
  }
}
