import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account-service.service';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  user: User = new User("");

  constructor(
    private accountService: AccountService, 
    private router: Router,
    private stateService: StateService
    ) {}

  ngOnInit() {
    this.user = this.accountService.userLoggedIn;
  }

  ionViewDidEnter() {
    if (this.user.username == null)
      this.user.username = this.accountService.userLoggedIn['name'];    
    this.stateService.stopLoading();
  }

  logout() {
    this.accountService.logout();
  }
}


