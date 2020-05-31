import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  constructor() { }
  
  ngOnInit() {}
  
  @HostListener('scroll', ['$event'])
  removeFader(event){
    // visible height + pixel scrolled >= total height 
    if (event.target.scrollTop == 0) 
      this.topFader.nativeElement.style['display'] = "none";
    else
      this.topFader.nativeElement.style['display'] = "block";

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) 
      this.botFader.nativeElement.style['display'] = "none";
    else 
      this.botFader.nativeElement.style['display'] = "block";
    
  }

  @HostListener('scroll', ['$event'])
  removeFaderTop(event){
    // visible height + pixel scrolled >= total height 
    console.log(event.target.offsetHeight, event.target.scrollTop, event.target.scrollHeight)
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) 
      
  }
}
