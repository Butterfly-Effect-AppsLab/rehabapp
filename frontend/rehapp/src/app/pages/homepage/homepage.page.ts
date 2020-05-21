import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core'

const { SplashScreen } = Plugins;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  progress: number = 0;
  loaded:boolean = false;

  constructor(private router: Router) { 
    let interval = setInterval(() => {
      this.progress += 0.01;
      if (this.progress >= 1.2) {
        clearInterval(interval);
        this.router.navigateByUrl('/onboarding');
      }
    }, 25)
  }

  ngOnInit() { 
    SplashScreen.show({
      showDuration: 5000,
      autoHide: true
    });
  }

}


