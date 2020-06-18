import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { User } from 'src/app/services/models/User';
import { Router } from '@angular/router';
import { AlertController, IonItem } from '@ionic/angular';
import { AccountService } from 'src/app/services/account-service.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usermail: string = "jkucerak1@gmail.com";
  private password: string = "Heslo123";
  emailHighlighter: string = "highlight-gray";
  passHighlighter: string = "highlight-gray";
  valid: boolean;

  constructor(private APIservice: APIService, private accountService: AccountService, 
    private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.checkValidation();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Chyba ...',
      message: '...Váš e-mail, alebo heslo neboli zadané správne.',
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {

    this.APIservice.loginUser(new User(null, this.usermail, this.password)).subscribe(
      response => {
        console.log("status code: ", response.status);
        console.log("response: ", response.body);

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
}
