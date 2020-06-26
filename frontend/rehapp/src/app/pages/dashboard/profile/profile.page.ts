import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'src/app/services/state-service.service';
import { AccountService } from 'src/app/services/account-service.service';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  
  username: string;
  popoverIcon: string = "chevron-down-outline";
  listOfDiagnoses = ["Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza"]
  doneIcon = "/assets/images/days/done.svg";
  undoneIcon = "/assets/images/days/undone.svg";
  unknownIcon = "/assets/images/days/unknown.svg";
  diagnosisShown: string;
  days = {
    'mon' : '',
    tue : '',
    wed : '',
    thu : '',
    fri : '',
    sat : '',
    sun : '',
  }
  
  constructor(private account: AccountService, 
    private popoverController: PopoverController,
    private stateService: StateService,
    private router: Router) { }

  ngOnInit() {
    this.username = this.account.userLoggedIn.name;
    this.diagnosisShown = this.listOfDiagnoses[0];
    this.days.mon = this.doneIcon;
    this.days.tue = this.doneIcon;
    this.days.wed = this.undoneIcon;
    this.days.thu = this.doneIcon;
    this.days.fri = this.unknownIcon;
    this.days.sat = this.unknownIcon;
    this.days.sun = this.unknownIcon;
  }

  async presentPopover(ev: any) {
    this.popoverIcon = "chevron-up-outline";
    const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: {
        diagnoseList: this.listOfDiagnoses
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });

    popover.present();

    popover.onDidDismiss().then(
      data => {
        if (data.data)
          this.diagnosisShown = data.data
        this.popoverIcon = "chevron-down-outline"
      }
    );
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  showInfo() {
    let diag = new Diagnose();
    diag.id = 0;
    diag.name = this.diagnosisShown;
    diag.type = "diagnose";
    
    this.stateService.diagnosis = diag;    
    this.router.navigateByUrl('dashboard/profile/diaginfo')
  }
}