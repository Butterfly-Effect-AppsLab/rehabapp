import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, observable, from } from 'rxjs';
import { StorageService } from './storage.service';
import { mergeMap, catchError, take, switchMap, filter } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { APIService } from './apiservice.service';

const AUTH_URLS: Array<string> = ["users/me", "collectDiagnoses"]


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService, private api: APIService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const found = AUTH_URLS.find(url => url === req.url.split(environment.API_URL)[1]);
    if (!found)
      return next.handle(req);

    return this.storage.getAccessToken()
      .pipe(
        mergeMap((token: string) => {
          return next.handle(this.addAuthorizationHeader(req, token)).pipe(
            catchError(
              error => {
                return this.handleResponseError(error, req, next);
              })
          )
        })
      )
  }

  addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return clonedRequest;
    }
    else {
      console.log("Token is not available. Please check the local storage.");
      return request;
    }
  }

  handleResponseError(error, request?, next?): Observable<HttpEvent<any>> {
    if (error.status === 401)
      this.refreshAccessToken()

    return throwError(error);
  }

  // NEPOUZIVANA
  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if (error.status !== 401)
            return throwError(error);

          this.refreshAccessToken()

          return throwError(error);
        })
      )
  }

  refreshAccessToken(){
    this.storage.getItem('refresh_token').then(
      (token) => {
        if (token)
          return this.api.refresh({ "refresh_token": token }).subscribe(
          (resp) => {
            console.log("Refresh response: ", resp);
            this.storage.setItem('access_token', resp.body['access_token'])
          }
        )
      }
    )
  }
}
