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


  getQuestionsFromAPI() {
    // this.subscription.push(
    this.observables = this.api.getQuestions().pipe(
      take(1), 
      map(resp => {
        this.questions = resp;
        return resp;}

      ))      // berie do uvahy iba 1x response
    //   );    
  }



  childAnswered(id){
    if (id == -1){      
      this.type = "Diagnose";
      this.textForChild = "Takze ste zdravy :)";
      return;
    }
    if (id == -2){
      this.type = "Diagnose";
      this.textForChild = "Takze asi umriete :(";
      return;
    }

    this.questionForChild = this.findQuestion(id);
  }

  findQuestion(id: number): Question {
    return this.questions.find(question => question.id == id);
  }

  yesnoClick(){
    this.type = "YesNo";
    this.questionForChild = this.findQuestion(1) ;
  }

  multiOptClick() {
    this.type = "MultiOpt";
  }

  diagnoseClick(){
    this.type = "Diagnose";
  }
}
