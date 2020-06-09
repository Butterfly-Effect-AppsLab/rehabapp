import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core'

const { Storage } = Plugins;

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

  constructor(private router: Router) {  
    this.getItem().then((item) => {
      if (item != null) {
        console.log(item);        
        this.router.navigateByUrl('/home');
      }
    })
  }

  ngOnInit() {        
  }

  async getItem() {
    const { value } = await Storage.get({ key: 'user' });
    return value;
  }

  skip() {
    this.router.navigateByUrl('/selection'); 
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