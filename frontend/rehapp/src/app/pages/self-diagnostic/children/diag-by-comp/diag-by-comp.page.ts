import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/app/services/models/question';
import { error } from 'util';

@Component({
  selector: 'app-diag-by-comp',
  templateUrl: './diag-by-comp.page.html',
  styleUrls: ['./diag-by-comp.page.scss'],
})
export class DiagByCompPage implements OnInit {

  public type: String = "";
  public questionForChild: Object = {};
  public textForChild: String = "";

  public questions: Array<Question> = [];

  constructor(private api: APIService) { 
    this.getQuestionsFromAPI();
    // console.log("log" + (this.questions | async));
    
  }

  ngOnInit() {
  }

  getQuestionsFromAPI() {
    
    this.api.getQuestions()
      .subscribe(resp => this.questions = resp, 
        error => console.log(error));
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
