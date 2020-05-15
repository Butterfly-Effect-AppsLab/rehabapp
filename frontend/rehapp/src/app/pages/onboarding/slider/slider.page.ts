import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

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
  }

  ngOnInit() {        
  }

  slidePrev() {
    this.slides.slidePrev();
  }

  async slideNext() {
    let id = await this.slides.getActiveIndex();     

    if (id == 2)
      this.skip();          
    
    this.slides.slideNext();
  }

  skip() {
    this.router.navigateByUrl('/selection'); 
  }

  changeText(text?: string) {
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