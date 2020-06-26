import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
import { APIService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  user: User = new User("");

  constructor(private accountService: AccountService, private router: Router, private api: APIService, private storage: StorageService) {
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


