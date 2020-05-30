import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  @ViewChild('body', { static: false }) body: ElementRef;
  @ViewChild('backBody', { static: false }) backBody: ElementRef;

  constructor() { }

  ngOnInit() {}

}
