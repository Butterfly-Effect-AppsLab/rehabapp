import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-forgotten-pass',
  templateUrl: './forgotten-pass.page.html',
  styleUrls: ['./forgotten-pass.page.scss'],
})
export class ForgottenPassPage implements OnInit {

  usermail: string = "";
  validEmail: boolean = false;
  emailPattern: RegExp = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  emailHighlighter: string = "highlight-gray";

  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiService: APIService,
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  async presentAlert(header: string, subheader: string, error: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: header,
      subHeader: subheader,
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  setHighlight(event: string) {
    if (event == "focus")
      this.emailHighlighter = "highlight-blue";
    else if (event == "blur") {
      if (this.validEmail)
        this.emailHighlighter = "highlight-dark";
      else
        this.emailHighlighter = "highlight-red";
    }
    else {
      this.emailHighlighter = "";
    }
  }

  checkValidation() {
    if (this.emailPattern.test(this.usermail))
      this.validEmail = true;
    else
      this.validEmail = false;
  }

  sendEmail() {
    if (!this.validEmail)
      this.presentAlert("Chyba...", null, "...zadajte platnú emailovú adresu.")
    else {
      this.stateService.startLoading();
      this.apiService.forgotPassword(this.usermail).subscribe((response) => {
        this.presentAlert(null, "Potvrdzovací email bol zaslaný na adresu", this.usermail);
        this.router.navigateByUrl('login');
      },
        (error) => {
          this.stateService.stopLoading();
          switch (error.error.description) {
            case 'Email not registered.':
              this.presentAlert("Chyba...", null, "...emailová adresa nie je zaregistrovaná.");
              break;
            case 'Email not verified.':
              this.presentAlert("Chyba...", null, "...emailová adresa nie je potvrdená.");
              break;
          }
        }
      );
    }
  }
}
