import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { APIService } from 'src/app/services/apiservice.service'
import { Question } from './Question'

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {


  public type: string = "";
  public questionForChild: object = {};
  public textForChild: String = "";

  public questions: [];           // create Question interface
  public areas: {};               // create Areas interface

  private areaID: string;

  public subscription: Array<Subscription> = [];
  public observables;

  constructor(private api: APIService) { 
    this.getQuestionsFromAPI();    
    
   // console.log(this.questions);
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.forEach(
      (subscribe) => subscribe.unsubscribe()
    );
  }

  getQuestionsFromAPI() {
    this.api.getQuestions().subscribe(
        resp => { 
          console.log(resp.body['self-diagnose']);
          console.log(resp.body['areas']);
          
          
          this.questions = resp.body['self-diagnose'];
          this.areas = resp.body['areas'];
         }
    )
    
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

  getQuestionsForArea(area: string) {
    return this.areas[area];
  }

  // findQuestion(id: string) {
  //   return this.APIresponse[id];
  // }

  start(){
    this.type = "Question";
    
    // this.questionForChild = this.findQuestion('q_1');
    // console.log(this.questionForChild);
    
  }

  // multiOptClick() {
  //   this.type = "MultiOpt";
  // }

  diagnoseClick(){
    this.type = "Diagnose";
  }
}
