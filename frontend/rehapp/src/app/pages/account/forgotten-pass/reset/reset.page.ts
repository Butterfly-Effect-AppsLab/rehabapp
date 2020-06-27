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
    else
      this.presentAlert("Vaše heslo bude zmenené", null, () => { this.router.navigateByUrl('login') });
  }
}
