import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from 'src/app/services/apiservice.service';
import { User } from 'src/app/services/models/User';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state-service.service';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usermail: string = "admin@admin.sk";
  private password: string = "Heslo123";
  private rememberLogin: boolean = false;
  private showPass: boolean = false;

  constructor(private APIservice: APIService, private accountService: AccountService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
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
          this.accountService.userLoggedIn = new User(
              response.body['user'].name, response.body['user'].email, null, response.body['user'].sex, response.body['user'].birthday
            );
          this.accountService.accessToken = response.body['access_token'];
          this.accountService.refreshToken = response.body['refresh_token'];

          this.router.navigateByUrl('/home');
        }
      },  
      error => {
        this.presentAlert();
      }  
    );
  }
}
