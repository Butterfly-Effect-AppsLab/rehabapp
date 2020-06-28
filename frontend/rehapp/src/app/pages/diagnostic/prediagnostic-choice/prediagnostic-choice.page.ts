import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/models/Tree';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-prediagnostic-choice',
  templateUrl: './prediagnostic-choice.page.html',
  styleUrls: ['./prediagnostic-choice.page.scss'],
})
export class PrediagnosticChoicePage implements OnInit {

  choice: Question = {
    prepend: "Viete, čo Vám je?",
    text: "Boli ste diagnostikovaný odborníkom?",
    options: [
      {
        id: 1,
        label: "Áno",
        ref: '1', 
        side: null,
        text: "Áno",
      },{
        id: 2,
        label: "Nie",
        ref: '2', 
        side: null,
        text: "Nie",
      },
    ],
    style: {
      'background-color': '#f6f1ee', 'color': '#012c3d'
    },
    type: null
  }

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit() {
  }

  childAnswered(ref: string) {
    if (ref === '1')
      this.router.navigateByUrl('diagnostic/search')
    else if (ref === '2')
      this.stateService.navigateToBodyPage();
    else 
      alert('chyba')
  }
}
