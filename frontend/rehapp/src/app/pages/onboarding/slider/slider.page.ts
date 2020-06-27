import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  @ViewChild('slider', {static: false}) slides: IonSlides; 

  lastSlide: boolean = false;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  buttonText: string = "Pokračovať";

  constructor(private storageService:StorageService, private router: Router, private alertController: AlertController) {  
  }

  ngOnInit() {        
  }

  async skip() {
    await this.router.navigateByUrl('diagnostic/choice');
  }

  sliderClicked(event: MouseEvent) {
    if(event.x > screen.width/2)
      this.slides.slideNext();
    else
      this.slides.slidePrev();
  }

  changeText() {
    this.slides.getActiveIndex().then(
      (id) => {       
        if (id == 2)
          this.lastSlide = true;
        else
          this.lastSlide = false;
      }     
    );   
  }
}