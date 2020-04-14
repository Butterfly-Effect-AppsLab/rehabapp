import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.page.html',
  styleUrls: ['./creative.page.scss'],
})
export class CreativePage implements OnInit {

  constructor(private API: APIService) { }

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
