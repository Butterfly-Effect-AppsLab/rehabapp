import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, observable, from, of } from 'rxjs';
import { StorageService } from './storage.service';
import { mergeMap, catchError, take, switchMap, filter, finalize } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { APIService } from './apiservice.service';

const AUTH_URLS: Array<string> = ["users/me", "collectDiagnoses"]


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private apiService: APIService,
    private storage: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
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

      return this.apiService.refresh().pipe(switchMap(token => {
        console.log('tokeeeeeeeeeeeeeen',token.body['access_token']);
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

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const found = AUTH_URLS.find(url => url === req.url.split(environment.API_URL)[1]);
  //   if (!found)
  //     return next.handle(req);

  //   return this.storage.getAccessToken()
  //     .pipe(
  //       mergeMap((token: string) => {
  //         return next.handle(this.addAuthorizationHeader(req, token)).pipe(
  //           catchError(
  //             error => {
  //               return this.handleResponseError(error, req, next);
  //             })
  //         )
  //       })
  //     )
  // }

  // addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  //   if (token) {
  //     const clonedRequest = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     return clonedRequest;
  //   }
  //   else {
  //     console.log("Token is not available. Please check the local storage.");
  //     return request;
  //   }
  // }

  // handleResponseError(error, request?, next?): Observable<HttpEvent<any>> {
  //   if (error.status === 401)
  //     this.refreshAccessToken(error, request, next)

  //   return throwError(error);
  // }

  // // // NEPOUZIVANA
  // // handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // //   return next.handle(req)
  // //     .pipe(
  // //       catchError((error) => {
  // //         if (error.status !== 401)
  // //           return throwError(error);

  // //         this.refreshAccessToken()

  // //         return throwError(error);
  // //       })
  // //     )
  // // }

  // refreshAccessToken(error, request? : HttpRequest<any>, next?){
  //   this.storage.getItem('refresh_token').then(
  //     (token) => {
  //       if (token)
  //         return this.api.refresh({ "refresh_token": token }).pipe(switchMap((response)=>{
  //           console.log("Refresh response: ", response);
  //               this.storage.setItem('access_token', response.body['access_token'])
  //               return next.handle(this.addAuthorizationHeader(request, response.body['access_token']));
  //         })).subscribe();

  //       //   .subscribe(
  //       //   (resp) => {
  //       //     console.log("Refresh response: ", resp);
  //       //     this.storage.setItem('access_token', resp.body['access_token'])
  //       //     console.log(next.handle(request));
  //       //     return next.handle(request);
  //       //   }
  //       // )
  //     }
  //   )
  // }
// }
