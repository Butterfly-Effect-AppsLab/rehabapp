import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() text: String;  
  diagnose: Object = {}


  constructor() {   

    this.diagnose = 
      {
        "name": "diagnozka2",
        "description": "popiscek2",
        "visitDoctor": true
          
      }
    

  }

  ngOnInit() {

  }

}
