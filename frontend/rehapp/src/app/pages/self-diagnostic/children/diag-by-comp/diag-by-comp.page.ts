import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-diag-by-comp',
  templateUrl: './diag-by-comp.page.html',
  styleUrls: ['./diag-by-comp.page.scss'],
})
export class DiagByCompPage implements OnInit {

  type: String = "";
  questionForChild: Object = {};
  textForChild: String = "";

  questions: Array<Object> = [];

  constructor(private api: APIService) { 
    this.questions = this.getQuestionsFromAPI();
  }

  ngOnInit() {
  }

  getQuestionsFromAPI(): Array<Object> {
    // this.api.getQuestions()
    //   .subscribe(resp => {
    //     console.log(resp);
        
    //     return resp;
    //   });
    //   return [];

    return this.api.getQuestions();
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

  findQuestion(id: number): Object {
    for (let q of this.questions) {       
      if (q['id'] == id){
        return q;
      }
    }
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
