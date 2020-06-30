import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AccountService } from 'src/app/services/account.service';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private stateService: StateService,
    private accountService: AccountService) { }

  @ViewChild('bodyWrapper', { static: false }) bodyWrapper: ElementRef;
  @ViewChild('fader_top', { static: true }) topFader: ElementRef;
  @ViewChild('fader_bot', { static: true }) botFader: ElementRef;
  @ViewChild('searchbar', { read: ElementRef, static: true }) searchbar: ElementRef;

  allOptions: Array<object> = [];
  options: Array<object> = [];
  validOptions: Array<object> = [];
  selected: string = "";

  ngOnInit() {
    this.initOptions();
    const searchbar = this.searchbar.nativeElement;
    searchbar.addEventListener('ionInput', this.handleInput.bind(this));
  }

  initOptions() {
    this.stateService.startLoading().then(()=>{
      const interval = setInterval(() => {
        if (this.stateService.questions != undefined) {
          this.stateService.stopLoading();
          clearInterval(interval);
  
          for (let [property, value] of Object.entries(this.stateService.questions)) {
            if (property.startsWith("d_"))
              this.allOptions.push({ text: value.name, id: value.id });
          }
          this.options = this.allOptions.sort((a, b) => (a['text'] > b['text'] ? 1 : -1))
        }
      }, 1000);
    });
  }

  handleInput(event) {
    this.selected = '';
    const query = event.target.value.toLowerCase();
    const options = this.allOptions;
    const validOptions = [];

    requestAnimationFrame(() => {
      options.forEach(option => {
        if (option['text'].toLowerCase().indexOf(query) > -1) validOptions.push(option);
      });
    });

    this.options = validOptions;
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  optionSelected(event) {
    this.selected = (this.selected === event.text ? "" : event.text);
    console.log(this.findOption(this.selected));
  }

  findOption(text: string) {
    let opt = this.allOptions.find(opt => opt['text'] == text);
    return opt;
  }

  submit() {
    if (this.selected != "") {
      let diagnosis = new Diagnose();
      diagnosis.id = this.findOption(this.selected)['id'];
      diagnosis.name = this.findOption(this.selected)['text'];
      
      this.accountService.addDiagnose(diagnosis);      
    }
  }
}
