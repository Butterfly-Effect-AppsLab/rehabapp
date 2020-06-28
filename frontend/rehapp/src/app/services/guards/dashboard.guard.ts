import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { APIService } from '../apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private api: APIService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.accountService.userLoggedIn) {      
      setTimeout(() => {
        if (!this.accountService.userLoggedIn) {
          this.accountService.logout();
          this.router.navigateByUrl('/login')
          return false;
        }
        else 
          return true;
      }, 500);
    }
    else {
      return true;
    }
  }
}

