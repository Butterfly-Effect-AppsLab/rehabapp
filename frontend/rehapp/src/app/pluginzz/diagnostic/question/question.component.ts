import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Option, Question } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Input() question: Question
  @Output() onAnswer: EventEmitter<string> = new EventEmitter();
  @Output() onBack: EventEmitter<null> = new EventEmitter();
  @ViewChild('cont', {static:true} ) background: ElementRef

  options: Option[];

  constructor() {}

  ngOnInit() {
  }

  btnClicked(index: number){
    let option: Option = this.options[index];

    if (option == undefined)
      alert('dojebalo sa')
        
    this.onAnswer.emit(option.ref);
  }

  ngOnChanges() {
    this.options = this.question.options;       
    this.background.nativeElement['style']['backgroundColor'] = this.question.style["background-color"];
  }

  back() {
    this.onBack.emit();
  }
}
