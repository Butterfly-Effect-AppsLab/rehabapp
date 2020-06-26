import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { catchError, take, switchMap, filter, finalize } from 'rxjs/operators'

import { APIService } from './apiservice.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private apiService: APIService, private storage: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          if (error.error['description'] === "Token has expired")
            return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (request.url.includes('refresh')) {
    //   this.isRefreshingToken = false;
    //   return of(<any>this.apiService.logout());
    // }
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.apiService.refresh().pipe(
        switchMap(token => {
          if (token) {
            this.storage.setItem('access_token', token.body['access_token']);
            this.tokenSubject.next(token.body['access_token']);
            return next.handle(request);
          }
          // return of(<any>this.authenticationService.logout());
        }),
        catchError(err => {
          // this.authenticationService.logout();
          return throwError(err.error);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }));
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            console.log(token);
            return next.handle(request);
          }));
    }
  }
}
