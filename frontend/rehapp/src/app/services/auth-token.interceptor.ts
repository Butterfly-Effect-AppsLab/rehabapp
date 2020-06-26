import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { mergeMap } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

const AUTH_URLS: Array<string> = ["users/me", "collectDiagnoses"]

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const found = AUTH_URLS.find(url => url === request.url.split(environment.API_URL)[1]);
    if (!found)
      return next.handle(request);

    return this.storage.getAccessToken()
      .pipe(
        mergeMap((token: string) => {
          return next.handle(this.addAuthorizationHeader(request, token));
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
}
