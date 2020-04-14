import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Option } from 'src/app/pluginzz/diagnostic/multi-opt/Option';

@Component({
  selector: 'multi-opt',
  templateUrl: './multi-opt.component.html',
  styleUrls: ['./multi-opt.component.scss'],
})
export class MultiOptComponent implements OnInit, OnChanges {

  question: String = "";
  core: String = "";

  options: any[];

  constructor() { 
    console.log("Multi Opt Constructor"); 

  }

  @Input() value: number;
  ngOnInit() {
    console.log("Multi Opt OnInit"); 
    this.value = 0;

    this.options = [
      { id: 1, title: "Moznost1"},
      { id: 2, title: "Moznost2"},
      { id: 3, title: "Moznost3"}      
    ]
  }

  ngOnChanges(){
    this.value = 1
  }


  // nextPage() {
  //   new MultiOptComponent(
  //     this.options = [
  //     { id: 4, title: "novapolozka1"},
  //     { id: 5, title: "novapolozka2"},
  //     { id: 6, title: "novapolozka3"}      
  //   ])
    
  // }
}
