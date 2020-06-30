import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { AccountService } from 'src/app/services/account.service';
import { StateService } from 'src/app/services/state.service';
import { Diagnose } from 'src/app/services/models/Tree';

export var diagnoses: Array<Diagnose> = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private api: APIService, private accountService: AccountService) { }

  ngOnInit() {
    this.api.identify().subscribe(
      (data) => {this.accountService.userLoggedIn = data},
      (error) => { this.accountService.logout() }
    )
  }
}
