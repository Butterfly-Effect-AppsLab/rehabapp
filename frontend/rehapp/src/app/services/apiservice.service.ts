import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'

import { environment } from '../../environments/environment'
import { Observable, throwError } from 'rxjs';
import { User } from './models/User';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Diagnose } from './models/Tree';


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

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

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
        return this.http.get<any>(environment.API_URL + "users/me");
    }

    public updateUser(username: string, usersex: string, userbirth: string, userDiagnose: Diagnose) {

        let user;
        if (userDiagnose) {
            user = {
                'name': username,
                'sex': usersex,
                'birthday': userbirth,
                'collected_id': userDiagnose.id
            }
        } else {
            user = {
                'name': username,
                'sex': usersex,
                'birthday': userbirth
            }
        }
        
        return this.http.put<any>(environment.API_URL + "users/me", user);
    }

    // public refresh(token: {"refresh_token": string}) {

    public refresh() {

        return this.storage.getrefreshToken()
            .pipe(
                switchMap((token: string) => {
                    return this.http.post<any>(environment.API_URL + "refresh", {
                        "refresh_token": token
                    }, HTTP_OPTIONS)
                })
            )

        // return this.http.post<any>(environment.API_URL + "refresh", token, HTTP_OPTIONS)
    }

    public collect(id: number) {
        return this.http.post<any>(environment.API_URL + "collectDiagnoses", { "diagnose_id": id }, HTTP_OPTIONS)
    }

    public removeDiagnosis(id: number) {
        return this.http.request<any>('delete',environment.API_URL + "collectDiagnoses", 
        { 
            body: {'diagnose_id' : id }
        })
    }

    public checkEmail(email: object) {
        return this.http.post<string>(environment.API_URL + "checkEmail", email, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public forgotPassword(email: string) {
        return this.http.post<any>(environment.API_URL + "forgotPassword", {
            'email': email
        }, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public resetPassword(token: string, password: string) {
        return this.http.post<any>(environment.API_URL + "resetPassword", {
            'token': token,
            'password': password
        }, HTTP_OPTIONS)
            .pipe(
                catchError(this.handleError)
            );
    }

    public registrateUser(email: string, pass: string) {
        let body = {
            'email' : email,
            'password': pass
        }
        return this.http.post<User>(environment.API_URL + "registration", body, HTTP_OPTIONS)
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

    public sendConfirmationToken(token: string) {
        return this.http.post<any>(environment.API_URL + "registration/confirmation",{
            'token': token
        }, HTTP_OPTIONS)
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
