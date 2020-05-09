import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-part-selection',
  templateUrl: './body-part-selection.page.html',
  styleUrls: ['./body-part-selection.page.scss'],
})
export class BodyPartSelectionPage implements OnInit {

  constructor() { }

  actualCircle: EventTarget;
  position1: Array<number> = []

  ngOnInit() {
  }

  circleClicked(element: MouseEvent){
    // element.target['style']['fill'] = Math.floor(Math.random()*16777215).toString(16);
    
    if (this.actualCircle != undefined)
      this.actualCircle['style']['fill'] = "red";

    
    this.actualCircle = element.target;
    console.log(this.actualCircle['dataset']['majpos']);
    
    this.actualCircle['style']['fill'] = Math.floor(Math.random()*16777215).toString(16);

    
  }
}
