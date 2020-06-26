import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(
    private apiService: APIService,
    private stateService: StateService,
    private accountService: AccountService,
    private router: Router
  ) {
    let token = window.location.href.split('=')[1];

    if (token) {
      this.stateService.startLoading();
      this.apiService.sendConfirmationToken(token).subscribe(
        (resp) => {
          if (resp.body['access_token']) {
            this.accountService.login(resp.body).then(() => {
              this.stateService.stopLoading();
            });
          }
        },
        (error) => {
          this.accountService.loginError.next(error.error);
          this.router.navigateByUrl('login');
        }
      );
    }
  }

  ngOnInit() {
  }

}
