import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
import { StateService } from 'src/app/services/state.service';
import { APIService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { Diagnose } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  
  user: User = new User("");
  diagnoses: Array<Diagnose> = []
  selectedIndex = 0;

  constructor( private api: APIService, 
    private accountService: AccountService,
    private storage: StorageService, private stateService: StateService,
    private router: Router, ) {
  }
 
  ngOnInit() {
    this.user = new User('');
  }
  
  ionViewDidEnter() {
    this.user = this.accountService.userLoggedIn;
    this.diagnoses = this.user.diagnoses;
    
    this.stateService.stopLoading();
  }

  begin() {
    alert(`Program ${this.diagnoses[this.selectedIndex]} 'ešte nie je pripravený :)`);
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  programSelected(i) {
    console.log(i);
     this.selectedIndex = i;
  }

  identify() {
    this.api.identify().subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}


