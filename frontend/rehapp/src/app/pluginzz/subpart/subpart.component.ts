import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-subpart',
  templateUrl: './subpart.component.html',
  styleUrls: ['./subpart.component.scss'],
})
export class SubpartComponent implements OnInit {

  @Input() options: any = [];
  @Output() onOptionSelected: EventEmitter<Option> = new EventEmitter();
  
  @Input() actualBtn:Element = undefined;
  @Output() actualBtnChange = new EventEmitter<Element>();

  constructor() { }

  ngOnInit() {}

  optionClicked(event: Event, option: Option) {

    this.onOptionSelected.emit(option);

    if (this.actualBtn != undefined) {
      this.actualBtn.classList.remove('selected-subarea');
    }
    this.actualBtn = <Element>event.target;
    (<Element>event.target).classList.add('selected-subarea');
    this.actualBtnChange.emit(this.actualBtn);
  }
}
