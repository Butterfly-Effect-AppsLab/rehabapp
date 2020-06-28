import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(
    private apiService: APIService,
    private stateService: StateService,
    private accountService: AccountService,
    private router: Router,
    private alertController: AlertController
  ) {
    let token = window.location.href.split('=')[1];

    if (token) {
      this.stateService.startLoading();
      this.apiService.sendConfirmationToken(token).subscribe(
        (resp) => {
          if (resp.body['access_token']) {
            this.accountService.login(resp.body).then(() => {
              this.stateService.stopLoading();
              this.presentConfirm('Emailová adresa bola potvrdená.','Pokračujte do aplikácie.');
            });
          }
        },
        (error) => {
          if (error.error['description'] === 'User already verified') {
            this.presentAlert('...Vaša emailová adresa už bola potvrdená.')
          }
          
          this.accountService.loginError.next(error.error);
          this.router.navigateByUrl('login');
        }
      );
    }
  }

  ngOnInit() {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Upozornenie ...',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentConfirm(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('dashboard/demography');
          }
        }
      ]
    });

    await alert.present();
  }
}
