import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountService } from './services/account.service';

// deeplinks
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { StateService } from './services/state-service.service';
import { APIService } from './services/apiservice.service';
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private accountService: AccountService,
    private router: Router,
    private zone: NgZone,
    private stateService: StateService,
    private apiService: APIService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.accountService.loginSavedUser();
    });

    let page = window.location.href.split(':8000').pop().split('?')[0];
    let params = window.location.href.split('?')[1];

    switch (page) {
      case '/login':
        if (params) {
          this.stateService.startLoading();
          this.apiService.sendCodeGoogle(params).subscribe(
            (resp) => {
              if (resp.body['access_token']) {
                this.accountService.login(resp.body).then(()=>{
                  console.log(this.accountService.userLoggedIn);
                  if(resp.body['new_user'])
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
        break;
        case '/registration/confirmation':
          if (params) {
            this.router.navigateByUrl(page+'?'+params);
          }
          break;
    }

    App.addListener('appUrlOpen', (data: any) => {
      console.log('tusom');
      this.zone.run(() => {
        console.log(data.url);
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        // const slug = data.url.split(".app").pop();
        // if (slug) {
        //     this.router.navigateByUrl(slug);
        // }
        // If no match, do nothing - let regular routing 
        // logic take over
      });
    });
  }
}
