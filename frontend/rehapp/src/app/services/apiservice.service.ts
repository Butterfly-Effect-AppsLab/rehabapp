import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { API_URL } from './api.config'


@Injectable({
    providedIn: 'root'
})

export class APIService {


    // HTTP_OPTIONS = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': 'jwt-token'
    //     })
    // };

    constructor(private http: HttpClient) {
    }

    public checkConnection() {
        return this.http.get(API_URL)
    }

    public getTree() {
        return this.http.get<any>(API_URL + "questions");
    }  

    public updateTree(checksum: string) {
        return this.http.get<any>(API_URL + "questions/update/" + checksum, {observe: 'response'});     // full response with body, headers and response code
    }
}
