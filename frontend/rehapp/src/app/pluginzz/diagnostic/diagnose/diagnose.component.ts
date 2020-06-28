import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Diagnose } from 'src/app/services/models/Tree';
import { StorageService } from 'src/app/services/storage.service';
import { APIService } from 'src/app/services/apiservice.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss'],
})
export class DiagnoseComponent implements OnInit {

  @Input() diagnose: Diagnose;
  @Input() showContinueBtn: boolean = true;
  @Output() onBack: EventEmitter<null> = new EventEmitter;
  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;

  area: string = "";
  areaClicked = false;
  h1Size: number;

  constructor(private router: Router, 
    private stateService: StateService, 
    private accountService: AccountService,
    private storage: StorageService,
    private api: APIService) { }

  ngOnInit() {
    console.log(this.diagnose);
    
    if (this.diagnose.definition == undefined) {
      let newDiagnose: Diagnose = new Diagnose();
      newDiagnose.name = this.diagnose.name;
      newDiagnose.type = this.diagnose.type;
      newDiagnose.id = this.diagnose.id;
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
    this.accountService.addDiagnose(this.diagnose.id);
  }

  removeFader(event){
    this.stateService.removeFader(event, this.topFader, this.botFader)    
  }
}