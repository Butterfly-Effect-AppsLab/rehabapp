import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountService } from './services/account.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

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
        let page = data.url.split('/app').pop().split('?')[0];
        console.log(page);
        let params = data.url.split('?')[1];
        console.log(params);

        switch (page) {
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
      });
    });
  }
}
