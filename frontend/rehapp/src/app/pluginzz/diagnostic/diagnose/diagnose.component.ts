import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: object;
  @Output() onBack: EventEmitter<null> = new EventEmitter;;

  constructor() {}

  ngOnInit() {
    console.log(this.diagnose);
  }

  back() {
    this.onBack.emit();
  }
}