import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { APIService } from 'src/app/services/apiservice.service';
import { Animation, AnimationController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-body-part-selection',
  templateUrl: './body-part-selection.page.html',
  styleUrls: ['./body-part-selection.page.scss'],
})
export class BodyPartSelectionPage implements OnInit {

  actualCircle: any;
  actualSubarea: any;
  partSelected: boolean = false;
  partSubmitted: boolean = false;
  questions;
  areas;
  @ViewChild('square', { static: false }) square: ElementRef;
  @ViewChild('bodyWrapper', { static: false }) bodyWrapper: ElementRef;
  @ViewChild('body', { static: false }) body: ElementRef;

  left;
  ratio;

  constructor(private router: Router, private api: APIService, private animationCtrl: AnimationController) {
    this.api.getTree().subscribe(
      resp => {
        this.questions = resp.body['self-diagnose'];
        this.areas = resp.body['areas'];
      }
    )
  }

  ngOnInit() {
  }

  ionViewDidEnter() {    
    this.ratio = this.bodyWrapper.nativeElement.offsetHeight/Number(this.body.nativeElement.getAttribute('viewBox').split(" ")[3]);

    console.log(this.ratio);

    this.body.nativeElement.style.height = this.bodyWrapper.nativeElement.offsetHeight;
    this.left = (this.bodyWrapper.nativeElement.offsetWidth - this.body.nativeElement.getBoundingClientRect().width) / 2;
    console.log(this.left);
    this.body.nativeElement.style.width = this.bodyWrapper.nativeElement.offsetWidth;
    this.body.nativeElement.style.margin = 0;

    document.getElementById('gulicky').addEventListener('click', event => {
      this.circleClicked(event);
    })
  }

  circleClicked(element: any) {

    this.partSelected = true;

    if (this.actualCircle != undefined)
      this.actualCircle['style']['fill'] = "red";


    this.actualCircle = element.target;

    console.log(this.actualCircle.getAttribute('cx'),this.actualCircle.getAttribute('cy'))

    this.actualCircle['style']['fill'] = Math.floor(Math.random() * 16777215).toString(16);
  }

  showSubpart(element: any) {

    if (this.actualSubarea != undefined) {
      Array.from(this.actualSubarea.children).forEach(function (child: any) {
        child.style.opacity = 0.0;
      });
    }

    var area = element.srcElement.innerHTML.toLowerCase().trim();
    this.actualSubarea = document.getElementById(area);
    Array.from(this.actualSubarea.children).forEach(function (child: any) {
      child.style.opacity = 0.54;
    });
  }

  async submit() {

    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     'area' : this.areas[this.actualCircle['dataset']['area']],
    //     'questions' : this.questions
    //   }
    // };
    // this.router.navigate(['/selection/subpart-selection'], navigationExtras);

    var rect = document.getElementById('rect');

    var newWidth = ((Number(rect.getAttribute('width'))*this.ratio));

    console.log('newWidth', newWidth);

    var maxHeight = this.bodyWrapper.nativeElement.getBoundingClientRect().height;
    var maxWidth = this.bodyWrapper.nativeElement.getBoundingClientRect().width;

    var zoom = maxWidth/newWidth;
    // var zoom = 1/0.5971;

    var newHeight = ((Number(rect.getAttribute('height'))*this.ratio))*zoom;

    console.log(newHeight);

    console.log('maxWidth', maxWidth);
    console.log('zoom', zoom);

    console.log(zoom);

    console.log(rect);

    console.log(this.body.nativeElement.getBoundingClientRect());

    var width = this.body.nativeElement.getBoundingClientRect().width;
    var height = this.body.nativeElement.getBoundingClientRect().height;

    console.log(this.body.nativeElement.getAttribute('viewBox'));

    var x = -Number(rect.getAttribute('x'));
    var y =(-Number(rect.getAttribute('y')));
    // var y = 0;

    console.log(x, y);

    // this.body.nativeElement.setAttribute('viewBox', '0 100 252 675');

    // requestAnimationFrame

    x = (x * this.ratio)-this.left+((zoom*width-width)/2)/zoom;//-this.body.nativeElement.getBoundingClientRect().width/4;
    y = (y * this.ratio)+((zoom*height-height)/2)/zoom;//-this.body.nativeElement.getBoundingClientRect().height/4;

    console.log(x, y);

    this.actualCircle['style']['opacity'] = 0.0;
    this.partSubmitted = true;

    var duration = 1500;

    console.log(this.body.nativeElement.getBoundingClientRect());

    const animation: Animation = this.animationCtrl.create()
      .addElement(this.body.nativeElement)
      .duration(duration)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'scale(1) translate(0px,0px)' },
        // { offset: 0.5, transform: 'translate('+x+'px,'+y+'px)' },
        { offset: 1, transform: 'scale('+zoom+') translate('+x+'px,'+y+'px)'}
      ]);

    console.log(x, y);
      // this.body.nativeElement.style.transform= 'scale('+zoom+') translate('+x+'px,'+y+'px)';
      console.log(x, y);

    // translate(-'+((x*0.853)/2)+'px,-'+((y*0.853)/2)+'px)
    // const animation: Animation = createAnimation('')
    // .addElement(this.square.nativeElement)
    //   .duration(1500)
    //   .iterations(Infinity)
    //   .fromTo('transform', 'scale('+zoom+') translate('+x+'px,'+y+'px)')
    //   .fromTo('opacity', '1', '0.2');

    console.log('porovnanie',newHeight, maxHeight, newWidth, maxWidth)

    const animation2: Animation = this.animationCtrl.create()
      .addElement(this.bodyWrapper.nativeElement)
      .duration(duration)
      .iterations(1)
      .keyframes([
        { offset: 0, height: '90vh' },
        { offset: 0.8, height: '90vh' },
        { offset: 1, height: newHeight+'px' }
      ]);

    // const animation: Animation = createAnimation('')
    // .addElement(this.square.nativeElement)
    //   .duration(1500)
    //   .iterations(Infinity)
    //   .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    //   .fromTo('opacity', '1', '0.2');

    // bodyWrapper.style.height = "30vh";
    animation.play();
    animation2.play();

    console.log(this.body.nativeElement.getBoundingClientRect());

  }
}
