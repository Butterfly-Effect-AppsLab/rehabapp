import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Option, Question } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state-service.service';
import { Router } from '@angular/router';

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

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
  }

  btnClicked(ref: string){
    this.onAnswer.emit(ref);
  }

  ngOnChanges() {    
    this.options = this.question.options;       
    this.background.nativeElement['style']['backgroundColor'] = this.question.style["background-color"];
  }
}
