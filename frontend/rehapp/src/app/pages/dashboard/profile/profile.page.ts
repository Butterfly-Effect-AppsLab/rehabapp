import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { AccountService } from 'src/app/services/account.service';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';
import { Diagnose } from 'src/app/services/models/Tree';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('fader_top', { static: true }) topFader: ElementRef;
  @ViewChild('fader_bot', { static: true }) botFader: ElementRef;
  @ViewChild('chart', { static: true }) chart: ElementRef;

  username: string;
  popoverIcon: string = "chevron-down-outline";
  listOfDiagnoses: Array<Diagnose> = []
  doneIcon = "/assets/images/icons/days/done.svg";
  undoneIcon = "/assets/images/icons/days/undone.svg";
  unknownIcon = "/assets/images/icons/days/unknown.svg";
  diagnosisShown: string;
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

  constructor(private account: AccountService,
    private popoverController: PopoverController,
    private stateService: StateService,
    private router: Router) { }

  ngOnInit() {
    this.days.mon = this.doneIcon;
    this.days.tue = this.doneIcon;
    this.days.wed = this.undoneIcon;
    this.days.thu = this.doneIcon;
    this.days.fri = this.unknownIcon;
    this.days.sat = this.unknownIcon;
    this.days.sun = this.unknownIcon;
  }

  ionViewDidEnter() {
    this.username = this.account.userLoggedIn.name;
    this.namesize = this.calculateFont(this.username.length)
    this.listOfDiagnoses = this.account.userLoggedIn.diagnoses;
    if (this.listOfDiagnoses.length > 0)
      this.diagnosisShown = this.listOfDiagnoses[0].name;
    else
      this.diagnosisShown = null;

    this.loadChart();
  }

  async presentPopover(ev: any) {
    if (!this.diagnosisShown)
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
            this.diagnosisShown = data.data['name'];
          else
            this.diagnosisShown = data.data
        }
        this.popoverIcon = "chevron-down-outline"
        this.loadChart();
      }
    );
  }

  loadChart() {
    Chart.defaults.scale.gridLines.drawOnChartArea = false;
    var myChart = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Po', 'Ut', 'St', 'St', 'Pi', 'So', 'Ne'],
        datasets: [{
          label: 'Pain level',
          data: [2, 9, 3, 5, 2, 3, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
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
              // display: false,
              drawTicks: false,
              padding: 10,
              beginAtZero: true,
              max: 10
            },
            gridLines: {
              // display: false,
              // drawBorder: false,
              drawTicks: false,

            }
          }],
          xAxes: [{
            ticks: {
              padding: 10,
              // display: false,
              drawTicks: false
              // beginAtZero: true,
              // max: 10
            },
            gridLines: {
              // display: false,
              // drawBorder: false,
              drawTicks: false
            }
          }]
        }
      }
    });
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
    diag.name = this.diagnosisShown;
    diag.type = "diagnose";

    this.stateService.diagnosis = diag;
    this.router.navigateByUrl('dashboard/profile/diaginfo')
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }
}