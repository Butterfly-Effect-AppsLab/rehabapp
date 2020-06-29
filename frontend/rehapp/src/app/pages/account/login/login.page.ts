import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { User } from 'src/app/services/models/User';
import { Router } from '@angular/router';
import { AlertController, IonItem } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { StateService } from 'src/app/services/state.service';
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usermail: string = "test@test.te";
  private password: string = "Heslo123";
  emailHighlighter: string = "highlight-gray";
  passHighlighter: string = "highlight-gray";
  valid: boolean;

  constructor(
    private APIservice: APIService,
    private accountService: AccountService,
    private router: Router,
    private alertController: AlertController,
    private stateService: StateService
  ) {
    accountService.loginError.subscribe(
      (resp) => {
        if (resp) {
          if (resp['description'] == 'Google account email not verified')
          this.presentAlert("...nepodarilo sa overiť emailovú adresu.");
        }
        this.stateService.stopLoading();
      }),
      (err) => {
        console.log(err);        
      }
  }

  ngOnInit() {
    this.checkValidation();
  }

  ionViewDidEnter(){
    this.stateService.stopLoading();
  }

  async presentAlert(message: string = '...Váš e-mail, alebo heslo neboli zadané správne.') {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Chyba ...',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {

    this.APIservice.loginUser(new User(null, this.usermail, this.password)).subscribe(
      response => {
        if (response.status == 200) {
          this.accountService.login(response.body);
          this.router.navigateByUrl('/dashboard');
        }
      },
      () => {
        this.presentAlert();
      }
    );
  }

  async loginGoogle() {
    let googleUser = await Plugins.GoogleAuth.signIn();
    console.log(googleUser);

    this.stateService.startLoading();
          this.APIservice.sendCodeGoogle("code="+googleUser.serverAuthCode).subscribe(
            (resp) => {
              if (resp.body['access_token']) {
                this.accountService.login(resp.body).then(() => {
                  if (resp.body['new_user'])
                    this.router.navigateByUrl('dashboard/demography');
                  else
                    this.router.navigateByUrl('dashboard');
                });
              }
            },
            (error) => {
              this.accountService.loginError.next(error.error);
              this.router.navigateByUrl('login');
            }
          );
  }

  setHighlight(event: string, tagret: string): string {
    if (event == "focus")
      return "highlight-blue";
    else if (event == "blur") {
      if (tagret == "email") {
        if (this.usermail.length > 0)
          return "highlight-dark";
      }
      else if (tagret == "pass") {
        if (this.password.length > 0)
          return "highlight-dark";
      }
      return "highlight-gray";
    }
    else {
      return "";
    }

  }

  checkValidation() {
    this.valid = (this.usermail.length > 0 && this.password.length > 0)
  }

  forgotPass() {
    this.router.navigateByUrl('forgotten-pass');
  }
}
