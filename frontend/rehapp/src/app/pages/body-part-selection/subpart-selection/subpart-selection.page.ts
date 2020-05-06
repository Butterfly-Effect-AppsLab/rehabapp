import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subpart-selection',
  templateUrl: './subpart-selection.page.html',
  styleUrls: ['./subpart-selection.page.scss'],
})
export class SubpartSelectionPage implements OnInit {

  buttons = ['tlacitko','tlacitko','tlacitko','tlacitko','tlacitko','tlacitko']
  
  constructor() { }

  ngOnInit() {
  }

}
