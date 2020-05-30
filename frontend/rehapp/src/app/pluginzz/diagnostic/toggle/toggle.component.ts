import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {

  actualSide: string = 'front';
  areaSubmitted: boolean = false;
  toggleBack: Animation;
  toggleFront: Animation;
  hideRotationButton: Animation;
  @ViewChild('rotateBtn', { static: false }) rotateBtn: ElementRef;
  @ViewChild('rotateToggle', { static: false }) rotateToggle: ElementRef;
  initialized: boolean = false;
  toggleX: number;

  constructor(private animationCtrl: AnimationController, private stateService: StateService) {
    this.stateService.actualSide.subscribe((side) => {
      this.actualSide = side;
    });
  }

  ngOnInit() {

  }

  init() {
    var toggleX = this.rotateBtn.nativeElement.offsetWidth - 6 - this.rotateToggle.nativeElement.offsetWidth - 4;

    this.toggleBack = this.animationCtrl.create()
      .addElement(this.rotateToggle.nativeElement)
      .duration(300)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 1, transform: 'translateX(' + toggleX + 'px)' }
      ]);

    this.toggleFront = this.animationCtrl.create()
      .addElement(this.rotateToggle.nativeElement)
      .duration(300)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(' + toggleX + 'px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    this.initialized = true;
  }

  rotate() {

    if (this.stateService.animationInPogress)
      return;

    if (!this.initialized) {
      this.init();
    }

    if (this.actualSide == 'front') {
      this.toggleFront.stop();
      this.toggleBack.play();
      this.stateService.opositeSide.next('front');
      this.stateService.actualSide.next('back');
    }
    else {
      this.toggleBack.stop();
      this.toggleFront.play();
      this.stateService.opositeSide.next('back');
      this.stateService.actualSide.next('front');
    }
  }

  hideToggle() {
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
  }

  showToggle() {
    if (this.hideRotationButton) {
      this.hideRotationButton.direction('reverse');
      this.hideRotationButton.play();
    }
  }

}
