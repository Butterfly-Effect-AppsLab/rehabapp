import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  pass: string = "";
  repeat: string = "";
  validPass: boolean = false;
  confirmedPass: boolean = false;
  passPattern: RegExp = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9].{7,}/)
  passHighlighter: string = "highlight-gray";
  repHighlighter: string = "highlight-gray";
  token: string;

  constructor(
    private apiService: APIService,
    private stateService: StateService,
    private accountService: AccountService,
    private router: Router,
    private alertController: AlertController,
  ) {
    this.token = window.location.href.split('=')[1];
  }


  ngOnInit() {
  }

  async presentAlert(header: string, error: string, handler?: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: header,
      message: error,
      buttons: [
        {
          text: 'OK',
          handler: handler
        }
      ]
    });

    await alert.present();
  }

  setPassHighlight(event: string) {
    if (event == "focus")
      this.passHighlighter = "highlight-blue";
    else if (event == "blur") {
      if (this.validPass)
        this.passHighlighter = "highlight-dark";
      else
        this.passHighlighter = "highlight-red";
    }
    else {
      this.passHighlighter = "";
    }
  }

  setRepHighlight(event: string) {
    let yyy = { name: 'ahoj' }
    let xxx = yyy
    console.log(xxx);
    yyy.name = 'cau'
    console.log(xxx);


    if (event == "focus")
      this.repHighlighter = "highlight-blue";
    else if (event == "blur") {
      if (this.confirmedPass)
        this.repHighlighter = "highlight-dark";
      else
        this.repHighlighter = "highlight-red";
    }
    else {
      this.repHighlighter = "";
    }
  }

  checkValidation() {
    this.validPass = this.passPattern.test(this.pass);
  }

  checkConfirmation() {
    this.confirmedPass = (this.passPattern.test(this.pass) && (this.pass === this.repeat));
  }

  resetPass() {
    if (!this.validPass)
      this.presentAlert("Chyba...", "...heslo je príliš slabé");
    else if (!this.confirmedPass)
      this.presentAlert("Chyba...", "...zadané heslá sa nezhodujú");
    else {
      this.stateService.startLoading().then(()=>{
        this.apiService.resetPassword(this.token, this.pass).subscribe((resp) => {
          if (resp.body['access_token']) {
            this.accountService.login(resp.body).then(() => {
              this.presentAlert("Vaše heslo bolo zmenené...", '...pokračujte do aplikácie.', () => { this.router.navigateByUrl('dashboard') });
              this.stateService.stopLoading();
            });
          }
        }, () => {
          this.stateService.stopLoading();
          this.presentAlert("Chyba...", "...link na zmenu hesla je neplatný.");
          this.router.navigateByUrl('login');
        });
      });
    }
  }
}
