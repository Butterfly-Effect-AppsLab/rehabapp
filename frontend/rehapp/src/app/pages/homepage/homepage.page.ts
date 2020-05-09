import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private loadingController: LoadingController) { }

  loaded: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }
}


