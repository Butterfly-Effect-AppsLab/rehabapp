import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountService } from './services/account.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// deeplinks
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { APIService } from './services/apiservice.service';
import { StateService } from './services/state.service';
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
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private zone: NgZone,
    private stateService: StateService,
    private apiService: APIService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.accountService.loginSavedUser();
    });

    let page = window.location.href.split(':8100').pop().split('?')[0];
    let params = window.location.href.split('?')[1];

    switch (page) {
      case '/login':
        if (params) {
          this.stateService.startLoading();
          this.apiService.sendCodeGoogle(params).subscribe(
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
        break;
      case '/registration/confirmation':
        if (params) {
          this.router.navigateByUrl(page + '?' + params);
        }
        break;
      case '/resetPassword':
        if (params) {
          this.router.navigateByUrl(page + '?' + params);
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
