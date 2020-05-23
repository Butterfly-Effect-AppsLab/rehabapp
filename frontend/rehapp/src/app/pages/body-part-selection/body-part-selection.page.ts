import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { APIService } from 'src/app/services/apiservice.service';
import { Animation, AnimationController, Platform, IonRouterOutlet, IonRow } from '@ionic/angular';
import Body from 'src/app/services/models/Body';
import { TreeComponent, Area } from 'src/app/services/models/Tree';
import { TreeError } from '@angular/compiler';


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
  @ViewChild('buttons', { static: false }) buttons: ElementRef;
  @ViewChild('bodyWrapper', { static: false }) bodyWrapper: ElementRef;
  @ViewChild('body', { static: false }) body: ElementRef;
  @ViewChild('backBody', { static: false }) backBody: ElementRef;
  @ViewChild('rotateBtn', { static: false }) rotateBtn: ElementRef;
  @ViewChild('rotateToggle', { static: false }) rotateToggle: ElementRef;
  @ViewChild('continueBtn', { static: false }) continueBtn: ElementRef;

  left: number;
  ratio: number;
  zoom: Animation;
  opositeZoom: Animation;
  shrink: Animation;
  showOptions: Animation;
  hideRotationButton: Animation;

  toggleBack: Animation;
  toggleFront: Animation;

  wrapperSize: Number;

  toggleX: Number;

  bodies: any;

  rotateRowHeight: String = "20vh";

  selectedAreaObject: Area;
  opositeAreaObject: Area;
  options: any = [];
  ref: string = null;

  constructor(private router: Router, private api: APIService, private animationCtrl: AnimationController, public platform: Platform, public routerOutlet: IonRouterOutlet) {
  }

  getOptions(){
    if(this.selectedAreaObject == undefined)
      return [];
    console.log(this.selectedAreaObject.options);
    return this.selectedAreaObject.options;
  }

  changeSubAreaOpacity(opacity: number) {
    Array.from(this.actualSubarea.children).forEach(function (child: any) {
      child.style.opacity = opacity;
    });
  }

  back() {
    this.backward();
  }

  async ngOnInit() {
    this.bodies = {};

    await this.api.getTree();

    this.platform.ready().then(() => {

      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.areaSubmitted)
          this.back();
        else
          this.routerOutlet.pop();
      });
    });
  }

  async ionViewDidEnter() {

    this.toggleX = this.rotateBtn.nativeElement.offsetWidth - 6 - this.rotateToggle.nativeElement.offsetWidth - 4;

    this.toggleBack = this.animationCtrl.create()
      .addElement(this.rotateToggle.nativeElement)
      .duration(300)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 1, transform: 'translateX(' + this.toggleX + 'px)' }
      ]);

    this.toggleFront = this.animationCtrl.create()
      .addElement(this.rotateToggle.nativeElement)
      .duration(300)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(' + this.toggleX + 'px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    this.bodies['front'] = new Body('front');
    this.bodies['back'] = new Body('back');

    this.bodies['front'].body = this.body;
    this.bodies['back'].body = this.backBody;

    var arr = [];

    Array.from(this.bodies['front'].body.nativeElement.getElementsByTagName('g')).forEach(function (child: any) {
      if(child.id != "")
        arr.push(child.id);
  });

  this.bodies['front'].ids = arr;

  arr = [];

    Array.from(this.bodies['back'].body.nativeElement.getElementsByTagName('g')).forEach(function (child: any) {
      if(child.id != "")
        arr.push(child.id);
  });

  this.bodies['back'].ids = arr;

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

    this.selectedAreaObject = this.api.questions[this.actualCircle.id];
    this.options = this.selectedAreaObject.options;
    this.opositeAreaObject = <Area>Object.values(this.api.questions).find(tree => tree['tree'] == this.selectedAreaObject['tree'] && tree['name'] != this.selectedAreaObject['name']);

    console.log(this.selectedAreaObject.area_detail);
    console.log(this.opositeAreaObject);
    

    this.areaSelected = false;
    this.areaSubmitted = true;

    var wrapperWidth = this.bodyWrapper.nativeElement.getBoundingClientRect().width;
    var wrapperHeight = this.bodyWrapper.nativeElement.getBoundingClientRect().height;

    var newWrapperWidth = Number(this.selectedAreaObject.area_detail.width) * this.ratio;

    var zoom = wrapperWidth / newWrapperWidth;

    var newWrapperHeight = Number(this.selectedAreaObject.area_detail.height) * this.ratio * zoom;

    var width = this.bodies[this.actualSide].body.nativeElement.getBoundingClientRect().width;
    var height = this.bodies[this.actualSide].body.nativeElement.getBoundingClientRect().height;

    var x = -this.selectedAreaObject.area_detail.x;
    var y = -this.selectedAreaObject.area_detail.y;

    x = (x * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
    y = (y * this.ratio) + ((zoom * height - height) / 2) / zoom;

    this.bodies[this.actualSide].hideCircles();
    if(this.opositeAreaObject != undefined)
      this.bodies[this.opositeSide].hideCircles();

    var duration = 1500;

    this.hideRotationButton = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.rotateBtn.nativeElement)
      .duration(duration)
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: 1 },
        { offset: 0.8, opacity: 0 },
        { offset: 1, opacity: 0 },
      ]);

    this.hideRotationButton.play();

    this.zoom = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.bodies[this.actualSide].body.nativeElement)
      .iterations(1)
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

    this.rotateRowHeight = "0px";

    var buttonsHeight = wrapperHeight - newWrapperHeight + this.continueBtn.nativeElement.offsetHeight;

    this.buttons.nativeElement.style.height = buttonsHeight + 'px';

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
    if (this.opositeAreaObject != undefined) {

      var opositeX = -this.opositeAreaObject.area_detail.x;
      var opositeY = -this.opositeAreaObject.area_detail.y;

      opositeX = (opositeX * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
      opositeY = (opositeY * this.ratio) + ((zoom * height - height) / 2) / zoom;

      this.opositeZoom = this.animationCtrl.create()
        .direction('normal')
        .addElement(this.bodies[this.opositeSide].body.nativeElement)
        .iterations(1)
        .duration(0)
        .keyframes([
          { offset: 0, transform: 'scale(1) translate(0px,0px)' },
          { offset: 1, transform: 'scale(' + zoom + ') translate(' + opositeX + 'px,' + opositeY + 'px)' }
        ]);
      this.opositeZoom.play();
    }
  }

  async backward() {

    this.ref = null;

    this.rotateRowHeight = "20vh";

    this.bodies[this.opositeSide].hideBody();
    this.bodies[this.actualSide].showBody();
    this.visibleSide = this.actualSide;

    if (this.subareaSelected)
      this.changeSubAreaOpacity(0.0);

    this.areaSelected = false;
    this.subareaSelected = false;
    this.actualCircle = undefined;
    this.actualSubarea = undefined;

    this.hideRotationButton.direction('reverse');

    this.hideRotationButton.play();

    this.buttons.nativeElement.style.display = "none";

    if(this.opositeAreaObject != undefined){
      this.bodies[this.opositeSide].showCircles();
    }

    this.zoom.direction('reverse');
    this.shrink.direction('reverse');

    this.zoom.play();
    await this.shrink.play();

    this.areaSubmitted = false;

    this.bodies[this.actualSide].showCircles();

    this.showOptions.direction('reverse');

    this.showOptions.play();

    if(this.opositeAreaObject != undefined){
      this.opositeZoom.direction('reverse');
      this.opositeZoom.play();
    }

    this.selectedAreaObject = undefined;
    this.opositeAreaObject = undefined;
  }

  circleClicked(element: any) {
    this.areaSelected = true;

    if (this.actualCircle != undefined)
      this.actualCircle['style']['fill'] = "#C0C6C7";

    this.actualCircle = element.target;

    this.actualCircle['style']['fill'] = 'red';
  }

  showSubpart(subarea: string, ref: string) {

    this.ref = ref;    

    var side = 'front';

    if(this.bodies['back'].ids.includes(subarea))
      side = 'back';

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

  async rotate() {
    if (this.actualSide == 'front') {
      this.toggleFront.stop();
      this.toggleBack.play();
    }
    else {
      this.toggleBack.stop();
      this.toggleFront.play();
    }

    var tmpSide = this.actualSide;
    this.actualSide = this.opositeSide;
    this.opositeSide = tmpSide;
    this.visibleSide = this.actualSide;

    this.bodies[this.actualSide].showBody();
    this.bodies[this.actualSide].changeColorOfCircles('#C0C6C7');
    this.bodies[this.opositeSide].hideBody();

    this.actualCircle = undefined;
    this.areaSelected = false;
  }

  async submit() {
    if (!this.areaSubmitted)
      this.forward()
    else{
      console.log(this.ref); 
      this.router.navigate(['/diagnostic']);
    }
  }
}
