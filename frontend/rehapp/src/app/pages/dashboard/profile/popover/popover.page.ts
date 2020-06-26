import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  list = [];

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.list = this.navParams.get('diagnoseList');
  }

  selected(i: number) {
    console.log(this.list[i]);
    this.popoverController.dismiss(this.list[i])
  }
}
