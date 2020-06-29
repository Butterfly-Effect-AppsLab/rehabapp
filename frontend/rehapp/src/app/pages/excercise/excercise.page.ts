import { Component, OnInit } from '@angular/core';
import { Diagnose } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.page.html',
  styleUrls: ['./excercise.page.scss'],
})
export class ExcercisePage implements OnInit {

  videoCount = [];
  actualVideo = 0;
  excersiceDiagnose: Diagnose;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.videoCount = Array(4);
    this.excersiceDiagnose = this.stateService.excercise;
    console.log(this.excersiceDiagnose);

    if (!this.excersiceDiagnose) {
      this.excersiceDiagnose = new Diagnose()
      this.excersiceDiagnose.name = 'nezvoleny'
    }
  }
 
  next() {
    if (this.actualVideo < this.videoCount.length - 1)
      this.actualVideo++;
    }
    
    previous() {
      if (this.actualVideo > 0)
        this.actualVideo--;    
  }

}
