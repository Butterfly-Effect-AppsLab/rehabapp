import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private alertController: AlertController, private router: Router) { }

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
      this.presentAlert(null, "Potvrdzovací email bol zaslaný na adresu", this.usermail);
      this.router.navigateByUrl('forgotten-pass/reset');
    }
  }
}
