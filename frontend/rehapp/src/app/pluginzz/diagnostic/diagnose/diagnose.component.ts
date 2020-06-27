import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Diagnose } from 'src/app/services/models/Tree';
import { StorageService } from 'src/app/services/storage.service';
import { APIService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: Diagnose;
  @Input() diagnoseId: string;
  @Input() showContinueBtn: boolean = true;
  @Output() onBack: EventEmitter<null> = new EventEmitter;
  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;

  constructor(private router: Router, 
    private stateService: StateService, 
    private storage: StorageService,
    private api: APIService) { }
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
    this.api.identify().subscribe( 
      () => { console.log("pouzivatel je prihlaseny") },
      () => {
        this.storage.setItem('user_diagnose',this.diagnoseId)
      }
    )
    this.router.navigateByUrl('/dashboard');    
  }

  removeFader(event){
    this.stateService.removeFader(event, this.topFader, this.botFader)    
  }
}