import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/app/services/models/question';
import { error } from 'util';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-diag-by-comp',
  templateUrl: './diag-by-comp.page.html',
  styleUrls: ['./diag-by-comp.page.scss'],
})
export class DiagByCompPage implements OnInit, OnDestroy {

  public type: string = "";
  public questionForChild: object = {};
  public textForChild: String = "";

  public APIresponse: object = {};


  public questions: Array<Question> = [];

  public subscription: Array<Subscription> = [];
  public observables;

  constructor(private api: APIService) { 
    this.getQuestionsFromAPI();
    // console.log("log" + (this.questions | async));
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.forEach(
      (subscribe) => subscribe.unsubscribe()
    );
  }


  // getQuestionsFromAPI() {
  //   // this.subscription.push(
  //   this.observables = this.api.getQuestions().pipe(
  //     take(1), 
  //     map(resp => {
  //       this.questions = resp;
  //       return resp;}

  //     ))      // berie do uvahy iba 1x response
  //   //   );    
  // }


  getQuestionsFromAPI() {
    this.api.getQuestions().subscribe(
        resp => { this.APIresponse = resp;
         }
    )
    
  }

  childAnswered(id: string){
    console.log("ANSWER = " + id);
    

    if (this.APIresponse[id]["type"] == "question"){
      this.type = "YesNo"
      this.questionForChild = this.APIresponse[id];
    }
    if (this.APIresponse[id]["type"] == "diagnose"){
      this.type = "Diagnose"
      this.textForChild = this.APIresponse[id];
    }

  }

  findQuestion(id: string): Question {
    return this.APIresponse[id];
  }

  start(){
    this.type = "YesNo";
    
    this.questionForChild = this.findQuestion('q_1');
    console.log(this.questionForChild);
    
  }

  multiOptClick() {
    this.type = "MultiOpt";
  }

  diagnoseClick(){
    this.type = "Diagnose";
  }
}
