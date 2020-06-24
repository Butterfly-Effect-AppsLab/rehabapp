import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

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

    public identify() {
        return this.http.get<any>(environment.API_URL + "users/me")
    }

    public refresh(token: {"refresh_token": string}) {
        return this.http.post<any>(environment.API_URL + "refresh", token, HTTP_OPTIONS)
    }

    public collect() {
        return this.http.post<any>(environment.API_URL + "collectDiagnoses", {"diagnose_id" : 78}, HTTP_OPTIONS)
    }

    public checkEmail(email: object) {
        return this.http.post<string>(environment.API_URL + "checkEmail", email, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
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
