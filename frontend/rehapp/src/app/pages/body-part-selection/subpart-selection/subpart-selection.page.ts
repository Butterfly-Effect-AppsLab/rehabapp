import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-subpart-selection',
  templateUrl: './subpart-selection.page.html',
  styleUrls: ['./subpart-selection.page.scss'],
})
export class SubpartSelectionPage implements OnInit {

  buttons = []
  questions;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe( () => {      
      if (this.router.getCurrentNavigation().extras.state) {
        this.questions = this.router.getCurrentNavigation().extras.state.questions;
        let area = this.router.getCurrentNavigation().extras.state.area;
        let tree = this.questions[area];
        this.buttons = tree['options'];
      } 
      else {       
          this.buttons = [{label: "AAA"},{label: "BBB"},{label: "CCC"},{label: "DDD"}];
      }
    });
  }

  ngOnInit() {
  }

  getOption(label: string) {
    let opt; 
    this.buttons.forEach(element => {
      if (element['label'] == label) {        
        opt = element;
      }
    });

    return opt;
  }

  optionClicked(event: Event) {
    // console.log(event.target['textContent']);    
    let option = this.getOption(event.target['textContent']);
    let navigationExtras: NavigationExtras = {
      state: {
        'tree': this.questions,
        'subpart': option,
      }
    };
    this.router.navigate(['/diagnostic'], navigationExtras);
  }
}
