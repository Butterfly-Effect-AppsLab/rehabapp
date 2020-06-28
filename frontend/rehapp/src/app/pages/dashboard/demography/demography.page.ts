import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-demography',
  templateUrl: './demography.page.html',
  styleUrls: ['./demography.page.scss'],
})
export class DemographyPage implements OnInit {

  private months: Array<string> = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"]
  private name: string = ""
  private validName: boolean = false;
  private gender: string = "female"
  private birth: Date = new Date("1990-01-01");
  private nameHighlighter: string = "highlight-gray";
  private userDiagnose: Diagnose;

  constructor(
    private router: Router,
    private APIservice: APIService,
    private accountService: AccountService,
    private stateService: StateService,
    private storage: StorageService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.storage.getObject('user_diagnose').then(      
      (diag) => {
        if (diag) {
          this.userDiagnose = diag;
        }
      }
    )
  }

  ionViewDidEnter() {
    let user: User = this.accountService.userLoggedIn;

    console.log(user);

    this.name = user.name;
    this.gender = user.sex;
    this.birth = new Date(user.birthday);
    this.stateService.stopLoading();

    if (this.name.length > 0)
      this.nameHighlighter = "highlight-dark"
  }

  async presentAlert(error?: object, message?: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: error == null ? 'Chyba...' : 'Error',
      message: error == null ? message : JSON.stringify(error),
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: message,
      buttons: [
        {
          text: 'OK',
          handler: () => { this.router.navigateByUrl('dashboard') }
        }
      ]
    });

    await alert.present();
  }

  valueSelected(event: CustomEvent, source: string) {
    if (source == "sex") {
      this.gender = event.detail.value;
    }
    else if (source == "date")
      this.birth = new Date(event.detail.value);
  }

  createUser() {
    if (!this.validName) {
      this.presentAlert(null, "...je potrebné zadať meno.")
      return
    }

    if (this.birth == undefined) this.birth = new Date();
    let birthday = `${this.birth.getFullYear()}-${this.birth.getMonth() + 1}-${this.birth.getDate()}`;

    this.stateService.startLoading().then(
      () => {
        this.APIservice.updateUser(this.name, this.gender, birthday, this.userDiagnose).subscribe(
          (resp) => {
            this.stateService.stopLoading().then(
              () => {
                this.confirmAlert("Vaše údaje boli aktualizované.")
                this.accountService.userLoggedIn = resp;
              }
            )
          },
          (err) => {
            this.stateService.stopLoading();
            this.presentAlert(err.error);
          }
        )
      }
    )
  }

  setHighlight(event: string) {
    if (event == "focus")
      this.nameHighlighter = "highlight-blue";
    else if (event == "blur") {
      if (this.name.length > 0)
        this.nameHighlighter = "highlight-dark";
      else
        this.nameHighlighter = "highlight-red";
    }
    else {
      this.nameHighlighter = "";
    }
  }

  nameChanged() {
    if (this.name.length > 0)
      this.validName = true;
    else
      this.validName = false;
  }

  removeDiag() {
    this.userDiagnose = null;
  }
}
