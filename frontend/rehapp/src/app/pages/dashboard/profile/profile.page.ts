import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { AccountService } from 'src/app/services/account.service';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';
import { Diagnose } from 'src/app/services/models/Tree';
import { Chart } from 'chart.js'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('fader_top', { static: false }) topFader: ElementRef;
  @ViewChild('fader_bot', { static: false }) botFader: ElementRef;
  @ViewChild('chart', { static: false }) chart: ElementRef;

  username: string;
  popoverIcon: string = "chevron-down-outline";
  listOfDiagnoses: Array<any> = []
  doneIcon = "/assets/images/icons/days/done.svg";
  undoneIcon = "/assets/images/icons/days/undone.svg";
  unknownIcon = "/assets/images/icons/days/unknown.svg";
  public diagnosisShown: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  namesize: number = 32;
  days = {
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: '',
  }
  diagnoses: any[];
  selectedIndex: number;
  wrapper: any;

  constructor(private account: AccountService,
    private popoverController: PopoverController,
    private stateService: StateService,
    private router: Router) { }

  ngOnInit() {

    this.account.diagnoses.subscribe((data)=>{
      this.listOfDiagnoses = data;
    });

    this.diagnosisShown.subscribe((data)=>{
      if(data){
        this.loadChart();
      }
    });
  }

  updateDays(){
    this.days.mon = this.checkDay(this.diagnosisShown.value.week[0]);
    this.days.tue = this.checkDay(this.diagnosisShown.value.week[1]);
    this.days.wed = this.checkDay(this.diagnosisShown.value.week[2]);
    this.days.thu = this.checkDay(this.diagnosisShown.value.week[3]);
    this.days.fri = this.checkDay(this.diagnosisShown.value.week[4]);
    this.days.sat = this.checkDay(this.diagnosisShown.value.week[5]);
    this.days.sun = this.checkDay(this.diagnosisShown.value.week[6]);
  }

  checkDay(day){
    switch(day){
      case true:
        return this.doneIcon;
      case false:
        return this.undoneIcon;
      case null:
        return this.unknownIcon;
    }
  }

  async ionViewDidEnter() {
    this.username = this.account.userLoggedIn.name;
    this.namesize = this.calculateFont(this.username.length)
    this.listOfDiagnoses = this.account.userLoggedIn.diagnoses;
    if (this.listOfDiagnoses.length > 0){
      this.diagnosisShown.next(this.listOfDiagnoses[0]);
      this.updateDays();
      // this.loadChart();
    }
    else
      this.diagnosisShown.next(null);
  }

  async presentPopover(ev: any) {
    if (!this.diagnosisShown.value)
      return;
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
        if (data.data) {
          if (data.data['name'])
            this.diagnosisShown.next(data.data);
            this.updateDays();
        }
        this.popoverIcon = "chevron-down-outline"
      }
    );
  }

  loadChart() {
    Chart.defaults.scale.gridLines.drawOnChartArea = false;
    setTimeout(()=>{
      if(this.chart){
        var myChart = new Chart(this.chart.nativeElement, {
          type: 'bar',
          data: {
            labels: this.diagnosisShown.value.chart.x,
            datasets: [{
              label: 'Uroveň bolesti',
              data: this.diagnosisShown.value.chart.y,
              backgroundColor: this.diagnosisShown.value.chart.colors
            }]
          },
          options: {
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  drawTicks: false,
                  padding: 10,
                  beginAtZero: true,
                  max: 5
                },
                gridLines: {
                  drawTicks: false,
    
                }
              }],
              xAxes: [{
                ticks: {
                  padding: 10,
                  drawTicks: false
                },
                gridLines: {
                  drawTicks: false
                }
              }]
            }
          }
        });
      }
    },100);
    
  }

  calculateFont(length: number) {
    if (length < 8)
      return 32;
    if (length < 15)
      return 28;
    if (length < 20)
      return 24;
    if (length < 25)
      return 20;
    else
      return 18;
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  showInfo() {
    let diag = new Diagnose();
    diag.id = 0;
    diag.name = this.diagnosisShown.value.name;
    diag.type = "diagnose";

    this.stateService.diagnosis = diag;
    this.router.navigateByUrl('dashboard/profile/diaginfo')
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }
}