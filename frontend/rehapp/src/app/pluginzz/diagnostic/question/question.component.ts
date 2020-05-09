import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/pages/self-diagnostic/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Input() question: Object
  @Output() onAnswer: EventEmitter<string> = new EventEmitter();
  
  options: Option[];

  constructor() { 
  }

  ngOnInit() {
    this.options = this.question['options'];      
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
