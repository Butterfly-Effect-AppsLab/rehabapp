import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: Diagnose;
  @Output() onBack: EventEmitter<null> = new EventEmitter;
  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;

  constructor(private router: Router, private stateService: StateService) { }
  area: string = "";
  areaClicked = false;
  h1Size: number;

  ngOnInit() {
    if (this.diagnose.definition == undefined) {
      let newDiagnose: Diagnose = new Diagnose();
      newDiagnose.name = this.diagnose.name;
      newDiagnose.type = this.diagnose.type;
      this.diagnose = newDiagnose;
    }
    if (this.diagnose.name.length < 40) 
      this.h1Size = 165;
    else if (this.diagnose.name.length < 60)
      this.h1Size = 130;
    else 
      this.h1Size = 100;

  }

  setArea(area: string) {
    if (this.area == area)
      this.area = "";
    else
      this.area = area;
  }

  continue() {
    this.router.navigateByUrl('/dashboard');
  }

  @HostListener('scroll', ['$event'])
  removeFader(event){
    // visible height + pixel scrolled >= total height 
    if (event.target.scrollTop == 0) 
      this.topFader.nativeElement.style['display'] = "none";
    else
      this.topFader.nativeElement.style['display'] = "block";

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) 
      this.botFader.nativeElement.style['display'] = "none";
    else 
      this.botFader.nativeElement.style['display'] = "block";
  }
}