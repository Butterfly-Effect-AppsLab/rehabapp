import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.page.html',
  styleUrls: ['./creative.page.scss'],
})
export class CreativePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrolling = true;

  logScrollStart(){
    this.scrolling = false;
  }

  logScrollEnd(){
    this.scrolling = true;
  }

  logScrolling(){
    console.log("AAAAAAA");
  }
}
