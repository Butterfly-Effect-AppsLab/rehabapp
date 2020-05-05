import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demography',
  templateUrl: './demography.page.html',
  styleUrls: ['./demography.page.scss'],
})
export class DemographyPage implements OnInit {

  private months: Array<string> = ["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"]

  constructor() { }

  ngOnInit() {
  }

}
