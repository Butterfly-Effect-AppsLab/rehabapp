import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http'
import { Question } from '../pages/self-diagnostic/Question';
import { Observable } from 'rxjs';


  const API_URL = 'http://192.168.99.100:8000/';


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

  public getQuestions(): Observable<HttpResponse<Question[]>> {
    return this.http.get<Question[]>(API_URL + "questions", {observe: 'response'})
  }

}
