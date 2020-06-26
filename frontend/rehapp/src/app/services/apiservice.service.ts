import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'

import { environment } from '../../environments/environment'
import { Observable, throwError } from 'rxjs';
import { User } from './models/User';
import { catchError } from 'rxjs/operators';


const HTTP_OPTIONS = {
    // headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'jwt-token'
    // }),
    observe: 'response' as const,
};

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(private http: HttpClient) {
    }

    public checkConnection() {
        return this.http.get(environment.API_URL)
    }

    public getTree() {
        return this.http.get<any>(environment.API_URL + "questions");
    }

    public updateTree(checksum: string) {
        return this.http.get<any>(environment.API_URL + "questions/update/" + checksum, { observe: 'response' });     // full response with body, headers and response code
    }

    public registrateUser(user: User) {

        return this.http.post<User>(environment.API_URL + "registration", user.toJSON(), HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public loginUser(user: User) {
        const body = {
            "email": user.email,
            "password": user.password
        }
        return this.http.post<User>(environment.API_URL + "login", body, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public loginGoogle() {
        return this.http.get<any>(environment.API_URL + "login/oauth/google", HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public sendCodeGoogle(code: string) {
        return this.http.get<any>(environment.API_URL + "login/oauth/google/code?"+code, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                'Backend returned code ', error.status, 
                'body was: ', error.error);
        }
        // return an observable with a user-facing error message
        return throwError(error);
    };
}
