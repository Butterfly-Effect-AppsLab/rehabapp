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

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  buttonText: string = "Pokračovať";

  constructor(private router: Router) {  
  }

  ngOnInit() {       
  }


  async slideNext() {
    let id = await this.slides.getActiveIndex()

    // if (id == 2)
    //    this.router.navigateByUrl('/#SOMEPAGE#');     // navigate to slef diagnostic process page

    if (id == 2)
      this.router.navigateByUrl('/diagnostic');
    this.slides.slideNext();
  }

  changeText(text?: string) { 
    this.slides.getActiveIndex().then(
      (id) => {       
        if (id == 2)
          this.buttonText = "Začať";
        else
          this.buttonText = "Pokračovať";
      }     
    );   
  }
}