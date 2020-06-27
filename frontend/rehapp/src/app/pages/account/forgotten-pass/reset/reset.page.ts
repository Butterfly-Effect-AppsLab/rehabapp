import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private alertController: AlertController, private router: Router) { }

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

  setHighlight(highlighter: string, event: string) {
    this.repHighlighter = "highlight-dark"
    this.passHighlighter = "highlight-dark"
  }

  checkValidation() {
    this.validPass = this.passPattern.test(this.pass);
  }
  
  checkConfirmation() {
    this.confirmedPass = this.pass === this.repeat;
  }

  resetPass() {
    if (!this.validPass) 
      this.presentAlert("Chyba...","...heslo je príliš slabé");
    else if (!this.confirmedPass) 
      this.presentAlert("Chyba...","...zadané heslá sa nezhodujú");
    else 
      this.presentAlert("Vaše heslo bude zmenené", null, () => {this.router.navigateByUrl('login')});
  }
}
