import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-radiolist',
  templateUrl: './radiolist.component.html',
  styleUrls: ['./radiolist.component.scss'],
})
export class RadioListComponent implements OnInit {

  @Input() options: any = [];
  @Output() onOptionSelected: EventEmitter<Option> = new EventEmitter();

  @Input() actualBtn: Element = undefined;
  @Output() actualBtnChange = new EventEmitter<Element>();
  @Input() enableUnselect: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  optionClicked(event: Event, option: Option) {

    this.onOptionSelected.emit(option);

    if (this.actualBtn != undefined) {
      if (this.actualBtn != (<Element>event.target))
        this.actualBtn.classList.remove('selected-option');
    }

    if (this.enableUnselect) {
      if (this.actualBtn == (<Element>event.target)) {
        if (this.actualBtn.classList.contains('selected-option'))
          this.actualBtn.classList.remove('selected-option');
        else 
          this.actualBtn.classList.add('selected-option');
      }
      else {
        this.actualBtn = (<Element>event.target);
        this.actualBtn.classList.add('selected-option');
      }
    }
    else {
      this.actualBtn = (<Element>event.target);
      this.actualBtn.classList.add('selected-option');
    }

    this.actualBtnChange.emit(this.actualBtn);
  }
}
