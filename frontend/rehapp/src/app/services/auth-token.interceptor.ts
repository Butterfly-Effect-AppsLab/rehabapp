import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, observable, from } from 'rxjs';
import { StorageService } from './storage.service';
import { mergeMap, catchError, take, switchMap, filter } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { APIService } from './apiservice.service';

const AUTH_URLS: Array<string> = ["users/me", "collectDiagnoses"]


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthentication(request));
  }

  private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

    const found = AUTH_URLS.find(url => url === request.url.split(environment.API_URL)[1]);

    if (found) {
      const token = this.storage.getAccessToken();
      console.log('tokeeeeeeeeeeeeen', token);
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: 'Bearer ' + token }
        });
      }
    }
    return request.clone();
  }
}
