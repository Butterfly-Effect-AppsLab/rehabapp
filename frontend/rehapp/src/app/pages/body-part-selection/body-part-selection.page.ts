import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { APIService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-body-part-selection',
  templateUrl: './body-part-selection.page.html',
  styleUrls: ['./body-part-selection.page.scss'],
})
export class BodyPartSelectionPage implements OnInit {

  actualCircle: EventTarget;
  position1: Array<number> = []
  partSelected: boolean = false;
  questions;
  areas;

  constructor(private router: Router, private api: APIService) { 
    this.api.getQuestions().subscribe(
      resp => { 
        this.questions = resp.body['self-diagnose'];
        this.areas = resp.body['areas'];
      }
    )
  }

  ngOnInit() {
  }

  circleClicked(element: MouseEvent){
    this.partSelected = true;

    if (this.actualCircle != undefined)
      this.actualCircle['style']['fill'] = "red";

    
    this.actualCircle = element.target;
    console.log(this.actualCircle['dataset']['majpos']);
    
    this.actualCircle['style']['fill'] = Math.floor(Math.random()*16777215).toString(16);
  }

  submit() {

    let navigationExtras: NavigationExtras = {
      state: {
        'area' : this.areas[this.actualCircle['dataset']['area']],
        'questions' : this.questions
      }
    };
    this.router.navigate(['/selection/subpart-selection'], navigationExtras);
  }
}
