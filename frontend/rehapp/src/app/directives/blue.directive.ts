import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'h1'
})
export class BlueDirective {

  constructor(private elem: ElementRef) {
    this.elem.nativeElement.style.color = "blue"
   }

  

}
