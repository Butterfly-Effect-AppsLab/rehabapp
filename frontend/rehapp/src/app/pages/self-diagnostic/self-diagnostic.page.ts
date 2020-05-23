import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

import { APIService } from 'src/app/services/apiservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Area, Option, Question } from 'src/app/services/models/Tree';
import { StateServiceService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {


  public type: string = "";
  public questionForChild: object = {};
  public textForChild: String = "";

  private subpart: Option;
  private tree;

  private areaID: string;

  public subscription: Array<Subscription> = [];
  public observables;
  startingState: Question;

  constructor(private route: ActivatedRoute, private router: Router, private api: APIService, private stateService: StateServiceService) {

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

    // this.const();

    // this.stateService.actualSubpart.pipe(
    //   map(state => { this.startingState = state })
    // ).subscribe();
  }

  // async const(){
  //   console.log("before: " + this.tree);    
  //   let response = await this.getTreeFromAPI().toPromise();

  //   console.log("after: ", response);    
  //   console.log("nieco");    
  // }

  // getTreeFromAPI(): Observable<any> {
  //   return this.api.getTree().pipe(map(
  //     resp => {
  //       this.tree = resp.body["self-diagnose"];
  //       this.subpart = resp.body["self-diagnose"]["a_1"]['options'][0];

  //       return resp;
  //     }
  //   ));
  // }


  ngOnInit() {
    // if (this.tree == undefined) {
    //   this.getTreeFromAPI();      // ako spravit, aby pockalo, kym sa vykona ???? 
    //   this.subpart = { id: -1, label: "Bolesť pozdĺž hrudnej chrbtice", ref: 'q_1' };
    // }
  }

  ngOnDestroy() {
    // this.subscription.forEach(
    //   (subscribe) => subscribe.unsubscribe()
    // );
  }



  // childAnswered(id: string){
  //   console.log("ANSWER = " + id);


  //   if (this.APIresponse[id]["type"] == "question"){
  //     this.type = "YesNo"
  //     this.questionForChild = this.APIresponse[id];
  //   }
  //   if (this.APIresponse[id]["type"] == "diagnose"){
  //     this.type = "Diagnose"
  //     this.textForChild = this.APIresponse[id];
  //   }

  // }

  // getQuestionsForArea(area: string) {
  //   return this.areas[area];
  // }

  // findQuestion(id: string) {
  //   return this.APIresponse[id];
  // }

  // start() {
  //   this.type = "Question";
  //   this.questionForChild = this.tree[this.subpart.ref]
  // }

  // // multiOptClick() {
  // //   this.type = "MultiOpt";
  // // }

  // diagnoseClick() {
  //   this.type = "Diagnose";
  // }
}
