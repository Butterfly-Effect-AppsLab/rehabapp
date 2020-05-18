import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { APIService } from 'src/app/services/apiservice.service';
import { Animation, AnimationController, Platform, IonRouterOutlet } from '@ionic/angular';
import Body from 'src/app/services/models/Body';


@Component({
  selector: 'app-body-part-selection',
  templateUrl: './body-part-selection.page.html',
  styleUrls: ['./body-part-selection.page.scss'],
})
export class BodyPartSelectionPage implements OnInit {

  actualCircle: Element;
  actualSubarea: Element;
  actualSide: string = 'front';
  opositeSide: string = 'back';
  visibleSide: string = 'front';
  areaSelected: boolean = false;
  areaSubmitted: boolean = false;
  subareaSelected: boolean = false;
  questions;
  areas;
  @ViewChild('buttons', { static: false }) buttons: ElementRef;
  @ViewChild('bodyWrapper', { static: false }) bodyWrapper: ElementRef;
  @ViewChild('body', { static: false }) body: ElementRef;
  @ViewChild('backBody', { static: false }) backBody: ElementRef;

  left: number;
  ratio: number;
  zoom: Animation;
  opositeZoom: Animation;
  shrink: Animation;
  showOptions: Animation;
  wrapperSize: Number;

  bodies: any;

  constructor(private router: Router, private api: APIService, private animationCtrl: AnimationController, public platform: Platform, public routerOutlet: IonRouterOutlet) {

    this.bodies = {};

    this.api.getTree().subscribe(
      resp => {
        this.questions = resp.body['self-diagnose'];
        this.areas = resp.body['areas'];
      }
    )

    platform.ready().then(() => {

      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.areaSubmitted)
          this.backward();
        else
          this.routerOutlet.pop();
      });
    });
  }

  changeSubAreaOpacity(opacity: number) {
    Array.from(this.actualSubarea.children).forEach(function (child: any) {
      child.style.opacity = opacity;
    });
  }

  back() {
    this.backward();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.bodies['front'] = new Body('front');
    this.bodies['back'] = new Body('back');

    this.bodies['front'].body = this.body;
    this.bodies['back'].body = this.backBody;

    this.wrapperSize = this.bodyWrapper.nativeElement.offsetHeight;

    this.ratio = this.bodyWrapper.nativeElement.offsetHeight / Number(this.bodies['front'].body.nativeElement.getAttribute('viewBox').split(" ")[3]);
    this.left = (this.bodyWrapper.nativeElement.offsetWidth - this.bodies['front'].body.nativeElement.getBoundingClientRect().width) / 2;

    this.bodies['front'].initSide(this.bodyWrapper);
    this.bodies['back'].initSide(this.bodyWrapper);

    this.bodies['front'].circles = document.getElementById('circles');
    this.bodies['back'].circles = document.getElementById('backCircles');

    this.bodies['front'].circles.addEventListener('click', event => {
      this.circleClicked(event);
    })
    this.bodies['back'].circles.addEventListener('click', event => {
      this.circleClicked(event);
    })
  }

  async forward() {

    this.areaSubmitted = true;
    this.areaSelected = false;

    var areas = {
      'front':{
        x: 66,
        y: 410,
        width: 166,
        height: 135
      },
      'back':{
        x: 90,
        y: 440,
        width: 112,
        height: 100
      }
    };

    var subarea =areas[this.actualSide];
    var opositeArea =areas[this.opositeSide];

    var wrapperWidth = this.bodyWrapper.nativeElement.getBoundingClientRect().width;
    var wrapperHeight = this.bodyWrapper.nativeElement.getBoundingClientRect().height;

    var newWrapperWidth = Number(subarea.width) * this.ratio;

    var zoom = wrapperWidth / newWrapperWidth;

    var newWrapperHeight = Number(subarea.height) * this.ratio * zoom;

    var buttonsHeight = wrapperHeight - newWrapperHeight;

    this.buttons.nativeElement.style.height = buttonsHeight + 'px';

    var width = this.bodies[this.actualSide].body.nativeElement.getBoundingClientRect().width;
    var height = this.bodies[this.actualSide].body.nativeElement.getBoundingClientRect().height;

    var x = -subarea.x;
    var y = -subarea.y;

    x = (x * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
    y = (y * this.ratio) + ((zoom * height - height) / 2) / zoom;

    var opositeX = -opositeArea.x;
    var opositeY = -opositeArea.y;

    opositeX = (opositeX * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
    opositeY = (opositeY * this.ratio) + ((zoom * height - height) / 2) / zoom;

    this.bodies[this.actualSide].hideCircles();
    this.bodies[this.opositeSide].hideCircles();

    var duration = 1500;

    this.opositeZoom = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.bodies[this.opositeSide].body.nativeElement)
      .duration(0)
      .keyframes([
        { offset: 0, transform: 'scale(1) translate(0px,0px)' },
        { offset: 1, transform: 'scale(' + zoom + ') translate(' + x + 'px,' + y + 'px)' }
      ]);

    this.zoom = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.bodies[this.actualSide].body.nativeElement)
      .duration(duration)
      .keyframes([
        { offset: 0, transform: 'scale(1) translate(0px,0px)' },
        { offset: 1, transform: 'scale(' + zoom + ') translate(' + x + 'px,' + y + 'px)' }
      ]);

    this.shrink = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.bodyWrapper.nativeElement)
      .duration(duration)
      .iterations(1)
      .keyframes([
        { offset: 0, height: this.wrapperSize + "px" },
        { offset: 0.8, height: this.wrapperSize + "px" },
        { offset: 1, height: newWrapperHeight + 'px' }
      ]);

    this.zoom.play();

    await this.shrink.play();

    this.buttons.nativeElement.style.display = "block";

    this.showOptions = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.buttons.nativeElement)
      .duration(500)
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' }
      ]);

    await this.showOptions.play();
    this.opositeZoom.play();
  }

  async backward() {
    this.bodies[this.opositeSide].hideBody();
    this.bodies[this.actualSide].showBody();
    this.visibleSide = this.actualSide;

    if (this.subareaSelected)
      this.changeSubAreaOpacity(0.0);

    this.areaSelected = false;
    this.subareaSelected = false;
    this.actualCircle = undefined;
    this.actualSubarea = undefined;

    this.buttons.nativeElement.style.display = "none";

    this.bodies[this.opositeSide].showCircles();

    this.zoom.direction('reverse');
    this.opositeZoom.direction('reverse');
    this.shrink.direction('reverse');

    this.zoom.play();
    await this.shrink.play();

    this.bodies[this.actualSide].showCircles();
    this.areaSubmitted = false;

    this.showOptions.direction('reverse');

    this.showOptions.play();
    this.opositeZoom.play();
  }

  circleClicked(element: any) {
    this.areaSelected = true;

    if (this.actualCircle != undefined)
      this.actualCircle['style']['fill'] = "black";

    this.actualCircle = element.target;

    this.actualCircle['style']['fill'] = 'red';
  }

  showSubpart(subarea: string, side: string) {

    this.subareaSelected = true;

    if (this.actualSubarea != undefined) {
      this.changeSubAreaOpacity(0.0);
    }

    if (this.visibleSide != side) {
      this.visibleSide = side;

      if (this.actualSide == this.visibleSide) {
        this.bodies[this.opositeSide].hideBody();
        this.bodies[this.actualSide].showBody();
      } else {
        this.bodies[this.actualSide].hideBody();
        this.bodies[this.opositeSide].showBody();
      }
    }

    this.actualSubarea = document.getElementById(subarea);
    this.changeSubAreaOpacity(0.54);
  }

  rotate() {
    var tmpSide = this.actualSide;
    this.actualSide = this.opositeSide;
    this.opositeSide = tmpSide;
    this.visibleSide = this.actualSide;

    this.bodies[this.actualSide].showBody();
    this.bodies[this.actualSide].changeColorOfCircles('black');
    this.bodies[this.opositeSide].hideBody();

    this.actualCircle = undefined;
    this.areaSelected = false;
  }

  async submit() {
    if (!this.areaSubmitted)
      this.forward()
  }
}
