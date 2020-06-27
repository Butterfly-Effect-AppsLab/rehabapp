import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  
  diagnoses: Array<string> = ["Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza"]
  username: string;

  constructor(private account: AccountService, 
    private alertController: AlertController,
    private stateService: StateService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() { 
    if (!this.username || this.username !== this.account.userLoggedIn.username)
      this.username = this.account.userLoggedIn.name;
  }

  async presentAlert(text: string, confirmHandler?: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Ste si istý...',
      message: text,
      buttons: [
        {
          text: 'Áno',
          handler: confirmHandler
        }, {
          text: 'Nie',
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.presentAlert('...že sa chcete odhlásiť?', () => { this.account.logout();});
  }

  removeDiag(index) {    
    let removeFromArr = () => { 
      this.diagnoses.splice(index,1)
    };
    this.presentAlert(`...že chcete odstrániť diagnózu ${this.diagnoses[index]}`, removeFromArr)
  }

  removeFader(event) {    
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }
}
