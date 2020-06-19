import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccountService } from './services/account-service.service';

// deeplinks
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { url } from 'inspector';
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
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.accountService.loginSavedUser();
    });

    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.get('code'));

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
