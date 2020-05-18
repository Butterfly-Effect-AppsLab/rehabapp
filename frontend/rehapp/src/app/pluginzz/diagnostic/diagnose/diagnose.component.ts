import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: object;  

  constructor() {   

  }

  ngOnInit() {
    console.log(this.diagnose);    
  }

}