import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController, Platform, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { APIService } from 'src/app/services/apiservice.service';
import { Area, Option } from 'src/app/services/models/Tree';
import { StateService } from 'src/app/services/state.service';
import { ToggleComponent } from 'src/app/pluginzz/diagnostic/toggle/toggle.component';
import { BodyComponent } from 'src/app/pluginzz/diagnostic/body/body.component';

import Body from 'src/app/services/models/Body';

@Component({
  selector: 'app-body-part-selection',
  templateUrl: './body-part-selection.page.html',
  styleUrls: ['./body-part-selection.page.scss'],
})
export class BodyPartSelectionPage implements OnInit {

  @ViewChild('buttons', { static: false }) buttons: ElementRef;
  @ViewChild('bodyWrapper', { static: false }) bodyWrapper: ElementRef;
  @ViewChild('fader_top', { static: true }) topFader: ElementRef;
  @ViewChild('fader_bot', { static: true }) botFader: ElementRef;

  @ViewChild('continueBtn', { static: false }) continueBtn: ElementRef;
  @ViewChild('toggleComponent', { static: false }) toggleComponent: ToggleComponent;
  @ViewChild('bodyComponent', { static: false }) bodyComponent: BodyComponent;

  actualCircle: Element;
  actualSubarea: Element;
  actualSubareaBtn: Element = undefined;
  visibleSide: string = 'front';
  areaSelected: boolean = false;
  areaSubmitted: boolean = false;
  subareaSelected: boolean = false;
  rotateRowHeight = "10vh";

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

  selectedAreaObject: Area;
  opositeAreaObject: Area;
  options: any = [];
  ref: string = null;
  loadedContent: boolean = false;

  initialized: boolean = false;

  duration: number = 1500;
  optionsDuration: number = 500;

  constructor(public loadingController: LoadingController, 
    private router: Router, 
    private animationCtrl: AnimationController, 
    public platform: Platform, 
    public navCtrl: NavController, 
    private stateService: StateService) {

    this.stateService.actualSide.subscribe(() => {
      if (this.initialized)
        this.rotate();
    });
  }

  async ngOnInit() {

    this.bodies = {};

    this.platform.ready().then(() => {

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.back();
      });
    });
  }

  ngAfterViewInit() {
    if (this.stateService.actualTreeComponent.getValue() != null && (<Area>this.stateService.actualTreeComponent.getValue()).first)
      this.areaSubmitted = true;
  }

  async ionViewDidEnter() {
    this.stateService.stopLoading();
    this.stateService.startLoading().then(
      () => {
        if (this.stateService.resetValues)
          this.setValues();

        if (!this.initialized) {
          this.init();
        }

        this.botFader.nativeElement.style['display'] = "none";
        this.stateService.stopLoading();
      }
    )
    var area = <Area>this.stateService.actualTreeComponent.getValue();
    if ((area != null && area.type == "area" && !area.first) || (area != null && area.type == "area" && area.first && this.areaSubmitted)) {
      await this.forward(0, 0);
    }
  }

  public setValues() {
    this.actualCircle = undefined;
    this.actualSubarea = undefined;
    this.actualSubareaBtn = undefined;
    this.areaSelected = false;
    this.areaSubmitted = false;
    this.subareaSelected = false;
    this.selectedAreaObject = null;
    this.opositeAreaObject = null;
    this.options = [];
    this.ref = null;
    this.stateService.resetValues = false;
  }

  getOptions() {
    if (this.selectedAreaObject == undefined)
      return [];
    return this.selectedAreaObject.options;
  }

  changeSubAreaOpacity(opacity: number) {
    Array.from(this.actualSubarea.children).forEach(function (child: any) {
      child.style.opacity = opacity;
    });
  }

  async back() {
    if (this.stateService.animationInPogress)
      return;
    if (this.areaSubmitted && (<Area>this.stateService.actualTreeComponent.getValue()).first)
      this.backward();
    else {
      if (this.stateService.componentStack.length == 0)
        this.navCtrl.back();
      else {
        await this.stateService.back();
        if (this.areaSubmitted)
          this.reset();
      }
    }
  }

  refresh() {
    location.reload();
  }

  init() {

    this.bodies['front'] = new Body('front');
    this.bodies['back'] = new Body('back');

    this.bodies['front'].body = this.bodyComponent.body;
    this.bodies['back'].body = this.bodyComponent.backBody;

    this.wrapperSize = this.bodyWrapper.nativeElement.offsetHeight;

    this.ratio = this.bodyWrapper.nativeElement.offsetHeight / Number(this.bodies['front'].body.nativeElement.getAttribute('viewBox').split(" ")[3]);
    this.left = (this.bodyWrapper.nativeElement.offsetWidth - this.bodies['front'].body.nativeElement.getBoundingClientRect().width) / 2;

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

    this.initialized = true;
  }

  async reset(duration = 0, optionsDuration = 0) {

    this.buttons.nativeElement.scrollTop = 0;

    this.stateService.animationInPogress = true;

    this.topFader.nativeElement.style['display'] = "none";
    this.botFader.nativeElement.style['display'] = "none";

    this.ref = null;

    this.rotateRowHeight = "10vh";

    this.bodies[this.stateService.opositeSide.getValue()].hideBody();
    this.bodies[this.stateService.actualSide.getValue()].showBody();
    this.visibleSide = this.stateService.actualSide.getValue();

    if (this.subareaSelected) {
      this.changeSubAreaOpacity(0.0);
      this.actualSubareaBtn.classList.remove('selected-subarea');
    }

    this.subareaSelected = false;
    this.actualSubarea = undefined;

    this.toggleComponent.showToggle();

    this.buttons.nativeElement.style.display = "none";

    if (this.opositeAreaObject != undefined) {
      this.bodies[this.stateService.opositeSide.getValue()].showCircles();
    }

    this.zoom.direction('reverse').duration(duration);
    this.shrink.direction('reverse').duration(duration);

    this.zoom.play();
    await this.shrink.play();

    this.bodies[this.stateService.actualSide.getValue()].showCircles();

    this.showOptions.direction('reverse').duration(optionsDuration);

    this.showOptions.play();

    if (this.opositeAreaObject != undefined) {
      this.opositeZoom.direction('reverse');
      await this.opositeZoom.play();
    }

    this.stateService.animationInPogress = false;
  }

  async forward(duration = this.duration, optionsDuration = this.optionsDuration) {

    this.stateService.animationInPogress = true;

    this.areaSubmitted = true;

    if (this.stateService.questions == undefined) {
      alert('Čaká sa na pripojenie.')
      return;
    }

    this.selectedAreaObject = <Area>this.stateService.actualTreeComponent.getValue();
    this.options = this.selectedAreaObject.options;
    this.opositeAreaObject = Object.values(this.stateService.questions)
      .filter(area =>
        area['type'] == ['area'] &&
        area['tree']['name'] == this.selectedAreaObject["tree"]["name"] &&
        area['name'] != this.selectedAreaObject["name"]
      )[0];

    this.areaSelected = false;

    var wrapperWidth = this.bodyWrapper.nativeElement.getBoundingClientRect().width;
    var wrapperHeight = this.bodyWrapper.nativeElement.getBoundingClientRect().height;

    var newWrapperWidth = Number(this.selectedAreaObject.width) * this.ratio;

    var zoom = wrapperWidth / newWrapperWidth;

    var newWrapperHeight = Number(this.selectedAreaObject.height) * this.ratio * zoom;

    var notFittedX = 0;

    if (newWrapperHeight > screen.height / 2) {
      newWrapperHeight = screen.height / 2;
      zoom = newWrapperHeight / (Number(this.selectedAreaObject.height) * this.ratio);
      newWrapperWidth = Number(this.selectedAreaObject.width) * this.ratio * zoom;
      notFittedX = (((wrapperWidth - newWrapperWidth) / 2) / this.ratio) / zoom;
    }

    var width = this.bodies[this.stateService.actualSide.getValue()].body.nativeElement.getBoundingClientRect().width;
    var height = this.bodies[this.stateService.actualSide.getValue()].body.nativeElement.getBoundingClientRect().height;

    var x = -this.selectedAreaObject.x;
    var y = -this.selectedAreaObject.y;

    x = (x * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
    y = (y * this.ratio) + ((zoom * height - height) / 2) / zoom;

    x += notFittedX;

    this.bodies[this.stateService.actualSide.getValue()].hideCircles();
    if (this.opositeAreaObject != undefined)
      this.bodies[this.stateService.opositeSide.getValue()].hideCircles();

    this.toggleComponent.hideToggle();

    this.zoom = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.bodies[this.stateService.actualSide.getValue()].body.nativeElement)
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

    if (this.buttons.nativeElement.lastElementChild.getBoundingClientRect().bottom - 2 > this.buttons.nativeElement.getBoundingClientRect().bottom) {
      this.botFader.nativeElement.style['display'] = 'block';
    }

    this.showOptions = this.animationCtrl.create()
      .direction('normal')
      .addElement(this.buttons.nativeElement)
      .duration(optionsDuration)
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' }
      ]);

    await this.showOptions.play();
    if (this.opositeAreaObject != undefined) {

      var opositeX = -this.opositeAreaObject.x;
      var opositeY = -this.opositeAreaObject.y;

      opositeX = (opositeX * this.ratio) - this.left + ((zoom * width - width) / 2) / zoom;
      opositeY = (opositeY * this.ratio) + ((zoom * height - height) / 2) / zoom;

      this.opositeZoom = this.animationCtrl.create()
        .direction('normal')
        .addElement(this.bodies[this.stateService.opositeSide.getValue()].body.nativeElement)
        .iterations(1)
        .duration(0)
        .keyframes([
          { offset: 0, transform: 'scale(1) translate(0px,0px)' },
          { offset: 1, transform: 'scale(' + zoom + ') translate(' + opositeX + 'px,' + opositeY + 'px)' }
        ]);
      this.opositeZoom.play();
    }

    this.stateService.animationInPogress = false;
  }

  async backward() {
    this.reset(this.duration, this.optionsDuration);

    this.areaSelected = false;
    this.actualCircle = undefined;

    this.areaSubmitted = false;

    this.stateService.actualTreeComponent.next(null);
  }

  circleClicked(element: any) {

    this.areaSelected = true;

    if (this.actualCircle != undefined) {
      this.actualCircle['style']['fill'] = "#C0C6C7";
      this.actualCircle['style']['opacity'] = '0.74';
    }

    this.actualCircle = element.target;

    var actualTreeComponent = this.stateService.questions[this.actualCircle.id];
    actualTreeComponent.first = true;

    this.stateService.actualTreeComponent.next(actualTreeComponent);

    this.actualCircle['style']['fill'] = '#F8444F';
    this.actualCircle['style']['opacity'] = '0.54';

  }

  showSubpart(option: Option) {

    this.ref = option.ref;

    this.subareaSelected = true;

    if (this.actualSubarea != undefined) {
      this.changeSubAreaOpacity(0.0);
      this.actualSubareaBtn.classList.remove('selected-subarea');
    }

    if (this.visibleSide != option.side) {
      this.visibleSide = option.side;

      if (this.stateService.actualSide.getValue() == this.visibleSide) {
        this.bodies[this.stateService.opositeSide.getValue()].hideBody();
        this.bodies[this.stateService.actualSide.getValue()].showBody();
      } else {
        this.bodies[this.stateService.actualSide.getValue()].hideBody();
        this.bodies[this.stateService.opositeSide.getValue()].showBody();
      }
    }

    this.actualSubarea = document.getElementById(option.label);
    this.changeSubAreaOpacity(0.54);
  }

  rotate() {

    if (this.stateService.animationInPogress)
      return;

    this.bodies[this.stateService.actualSide.getValue()].showBody();
    this.bodies[this.stateService.actualSide.getValue()].changeColorOfCircles('#C0C6C7');
    this.bodies[this.stateService.opositeSide.getValue()].hideBody();

    this.visibleSide = this.stateService.actualSide.getValue();

    this.actualCircle = undefined;
    this.areaSelected = false;
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  async submit() {

    if (!this.areaSubmitted && (<Area>this.stateService.actualTreeComponent.getValue()).first)
      this.forward()
    else {
      this.stateService.pushComponent(this.stateService.actualTreeComponent.getValue());
      this.stateService.actualTreeComponent.next(this.stateService.questions[this.ref]);

      await this.stateService.startLoading();
      await this.reset();
      this.router.navigate(['/diagnostic/self-diagnostic'])
    }
  }
}
