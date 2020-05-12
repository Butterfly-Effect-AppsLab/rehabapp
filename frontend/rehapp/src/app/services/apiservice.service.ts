import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { API_URL } from './api.config'
import { Tree } from './models/Tree';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'jwt-token'
    })
  };

  constructor(private http: HttpClient) { }

  // public getQuestions(): Observable<HttpResponse<Question[]>> {
  //   return this.http.get<Question[]>(API_URL + "questions", {observe: 'response'})
  // }

  public getTree(): Observable<HttpResponse<Tree>> {
    return this.http.get<Tree>(API_URL + "questions", {observe: 'response'});
  }

}
