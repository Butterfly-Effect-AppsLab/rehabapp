import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private api: APIService, private accountService: AccountService) { }

  ngOnInit() {
    this.api.identify().subscribe(
      () => { },
      () => { this.accountService.logout() }
    )
  }

}
