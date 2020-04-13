import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diag-by-comp',
  templateUrl: './diag-by-comp.page.html',
  styleUrls: ['./diag-by-comp.page.scss'],
})
export class DiagByCompPage implements OnInit {

  type: String = "";
  questionForChild: Object = {};
  textForChild: String = "";

  questions: Array<Object> = [
    {
      "id": 1,
      "question": "Boli vas rameno?",
      "answer" : {
        "yes": 3,
        "no" : 2,
      } 
    },
    {
      "id": 2,
      "question": "Boli vas chrbat?",
      "answer" : {
        "yes": 4,
        "no" : -1,
      } 
    },
    {
      "id": 3,
      "question": "Boli vas velmi?",
      "answer" : {
        "yes": 4,
        "no" : -1,
      } 
    },
    {
      "id": 4,
      "question": "Naozaj?",
      "answer" : {
        "yes": 5,
        "no" : -1,
      } 
    },
    {
      "id": 5,
      "question": "Mate COVID-19?",
      "answer" : {
        "yes": -2,
        "no" : -1,
      } 
    },

  ];

  constructor() { 
    
  }

  ngOnInit() {
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
