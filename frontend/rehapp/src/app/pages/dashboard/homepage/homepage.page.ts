import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  user: User = new User("");

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.accountService.userLoggedIn;
  }

  ionViewDidEnter() {
    if (this.user.username == null)
      this.user.username = this.accountService.userLoggedIn['name'];    
  }

  logout() {
    this.accountService.logout();
  }
}


