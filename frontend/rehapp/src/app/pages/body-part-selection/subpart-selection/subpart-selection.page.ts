import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subpart-selection',
  templateUrl: './subpart-selection.page.html',
  styleUrls: ['./subpart-selection.page.scss'],
})
export class SubpartSelectionPage implements OnInit {

  buttons = []

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let area = this.router.getCurrentNavigation().extras.state.area;
        let tree = this.router.getCurrentNavigation().extras.state.questions[area];
        console.log(
        this.buttons = tree['options']);
        
      }
    });
  }

  ngOnInit() {
  }

}
