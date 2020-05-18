import { ElementRef } from '@angular/core';

export default class Body {
    body: ElementRef;
    circles: Element;

    constructor(public side: string) {

    }

    initSide(bodyWrapper: ElementRef) {
        this.body.nativeElement.style.height = bodyWrapper.nativeElement.offsetHeight;
        this.body.nativeElement.style.width = bodyWrapper.nativeElement.offsetWidth;
        this.body.nativeElement.style.margin = 0;
    }

    hideCircles() {
        Array.from(this.circles.getElementsByTagName('circle')).forEach(function (child: any) {
            child.style.display = "none";
        });
    }

    showCircles() {
        Array.from(this.circles.getElementsByTagName('circle')).forEach(function (child: any) {
            child.style.display = "block";
            child.style.fill = "black";
        });
    }

    changeColorOfCircles(color: String) {
        Array.from(this.circles.getElementsByTagName('circle')).forEach(function (child: any) {
            child.style.fill = color;
        });
    }

    hideBody(){
        this.body.nativeElement.style.display = "none";
    }
    
    showBody(){
        this.body.nativeElement.style.display = "block";
    }
}