import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.scss'],
})
export class YesnoComponent implements OnInit, OnChanges{
  
  @Input() question: Object
  @Output() onAnswer: EventEmitter<number> = new EventEmitter();
  
  constructor() { 
  }

  ngOnInit() {
  }

  yesAnsClick() {
    this.onAnswer.emit(this.question['answer']['yes'])
  }

  noAnsClick() {
    this.onAnswer.emit(this.question['answer']['no'])
  }

  ngOnChanges() {
    console.log("Change detected");
    
  }

}
