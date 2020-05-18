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
  @ViewChild('main', {static:true} ) mainDiv: ElementRef

  options: Option[];

  constructor() {}

  ngOnInit() {
    this.options = this.question['options'];      
    this.mainDiv.nativeElement['style']['backgroundColor'] = this.question.color["background-color"];
    this.mainDiv.nativeElement['style']['color'] = this.question.color["text-color"];
  }

  btnClicked(event: any){
    let btnText = event.srcElement.innerHTML;
    let option: Option;
    this.options.forEach((opt) => {
       if (opt.label == btnText)
        option = opt;        
    })

    if (option == undefined)
      alert('dojebalo sa')
    
    this.onAnswer.emit(option.ref);
  }

  ngOnChanges() {
    this.options = this.question['options'];
  }

}
