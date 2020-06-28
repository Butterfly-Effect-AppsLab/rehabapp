import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
import { StateService } from 'src/app/services/state.service';
import { APIService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  
  user: User = new User("");
  diagnoses = ["Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza","Prva diagnoza","Druha diagnoze","Tretia diagnoza"]
  selectedIndex = 0;

  constructor( private api: APIService, 
    private accountService: AccountService,
    private storage: StorageService, private stateService: StateService,
    private router: Router, ) {
  }
 
  ngOnInit() {
    this.user = this.accountService.userLoggedIn;
  }
  
  ionViewDidEnter() {
    if (this.user.name == null)
      this.user.username = this.accountService.userLoggedIn['name'];    
    this.stateService.stopLoading();
  }

  begin() {
    this.router.navigateByUrl('dashboard/demography')
    // alert(`Program ${this.diagnoses[this.selectedIndex]} 'ešte nie je pripravený :)`);
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


