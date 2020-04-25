import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Option } from 'src/app/services/models/question';

@Component({
  selector: 'yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.scss'],
})
export class YesnoComponent implements OnInit, OnChanges{
  
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
