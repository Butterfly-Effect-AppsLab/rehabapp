import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-diaginfo',
  templateUrl: './diaginfo.page.html',
  styleUrls: ['./diaginfo.page.scss'],
})
export class DiaginfoPage implements OnInit {

  userDiagnosis: Diagnose;
  constructor(private stateSerivce: StateService) { }

  ngOnInit() {
    this.userDiagnosis = this.stateSerivce.diagnosis;     
  }
}
