import { Injectable } from '@angular/core';
import { User } from './models/User';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { APIService } from './apiservice.service';
import { AlertController } from '@ionic/angular';
import { Diagnose } from './models/Tree';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _registratingUser: User;
  private _userLoggedIn: User;
  private _refreshToken: string;
  private _accessToken: string;
  private _loginError: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public diagnoses: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private storageService: StorageService, 
    private router: Router, 
    private api: APIService,
    private alertController: AlertController) { }

  public get registratingUser() { return this._registratingUser }
  public set registratingUser(user: User) { this._registratingUser = user }

  public get userLoggedIn() { return this._userLoggedIn }
  public set userLoggedIn(user: User) { this._userLoggedIn = user }

  public get refreshToken() { return this._refreshToken }
  public set refreshToken(token: string) { this._refreshToken = token }

  public get accessToken() { return this._accessToken }
  public set accessToken(token: string) { this._accessToken = token }

  set loginError(error: BehaviorSubject<string>) {
    this._loginError = error;
  }

  get loginError(): BehaviorSubject<string> {
    return this._loginError;
  }
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: message,
      buttons: [
        {
          text: 'OK',
          handler: () => { this.router.navigateByUrl('dashboard') }
        },
        {
          text: 'Zrušiť'
        }
      ]
    });

    await alert.present();
  }

  loginSavedUser() {
    
    this.api.identify().subscribe(
      (user) => {
        console.log("User found: ", user);
        this.userLoggedIn = user;
        this.diagnoses.next(this.userLoggedIn.diagnoses);
        this.storageService.removeItem('user_diagnose');
        this.router.navigateByUrl('dashboard')
      },
      () => { }
    )
  }

  async login(responseBody: object) {    
    this.userLoggedIn = new User(
      responseBody['user'].name, responseBody['user'].email, null, responseBody['user'].sex, responseBody['user'].birthday
    );

    this.userLoggedIn.diagnoses = responseBody['user'].diagnoses;
    this.diagnoses.next(this.userLoggedIn.diagnoses);
    
    this.accessToken = responseBody['access_token'];
    this.refreshToken = responseBody['refresh_token'];
    
    this.storageService.setObject('user', this.userLoggedIn);
    this.storageService.setItem('access_token', this.accessToken);
    this.storageService.setItem('refresh_token', this.refreshToken);
    console.log(this.userLoggedIn);
  }

  async logout() {
    this.api.logout().subscribe(()=>{
      this.storageService.removeItem("user");
    this.storageService.removeItem("access_token");
    this.storageService.removeItem("refresh_token");
    this.userLoggedIn = undefined;
    this.diagnoses.next(null);
    this.router.navigateByUrl('/')
    }); 
  }

  addDiagnose(diag: Diagnose) {
    this.api.collect(diag.id).subscribe(
      (resp) => {
        if (resp.body['collected_id']) {
          console.log(resp.body);
          
          console.log('Diagnoza pridana neznamemu');
          this.storageService.setObject('user_diagnose', 
          {
            'id': resp.body['collected_id'],
            'name': resp.body['name']
          })
          this.router.navigateByUrl('/dashboard');
        }
        if (resp.body['diagnoses']) {
          console.log('Diagnoza pripada prihlasenemu');
          this.userLoggedIn.diagnoses = resp.body['diagnoses'];
          this.diagnoses.next(this.userLoggedIn.diagnoses);
          this.router.navigateByUrl('/dashboard');
        }
      },
      (err) => {
        if (err.error['description'] === 'User already has diagnose')
          this.presentAlert('Zvolenú diagnózu už máte pridelenú.')
      }
    )
  }
}
