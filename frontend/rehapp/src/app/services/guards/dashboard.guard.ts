import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { APIService } from '../apiservice.service';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private accountService: AccountService,
    private router: Router,
    private api: APIService,
    private stateService: StateService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.accountService.userLoggedIn) {
      this.stateService.startLoading();

      this.api.identify().subscribe(
        (data) => { 
          this.stateService.stopLoading();
          return true; 
        },
        (error) => { 
          this.accountService.logout();
          this.router.navigateByUrl('/login');
          this.stateService.stopLoading();
          return false; 
        }
      )

      // setTimeout(() => {
      //   if (!this.accountService.userLoggedIn) {
      //     this.accountService.logout();
      //     this.router.navigateByUrl('/login');
      //     this.stateService.stopLoading();
      //     return false;
      //   }
      //   else {
      //     this.stateService.stopLoading();
      //     return true;
      //   }
      // }, 1000);
    }
    else {
      return true;
    }
  }
}

