import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Quote } from '../../assets/data/quote'
import { Observable, of } from 'rxjs'

import { catchError, retry } from 'rxjs/operators'


const localUrl = './assets/data/quotes.json';
const url = 'http://192.168.99.100:8000/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};


@Injectable(
  // {providedIn: 'root'}
)
export class APIService {

  constructor(private http: HttpClient) { 
    console.log("APIService constructor");
    
  }

  getResponse() {
    
    return this.http.get(url);
    
  }


  getQuestions() {
    return [
      {
        "id": 1,
        "question": "Boli vas rameno?",
        "answer" : {
          "yes": 3,
          "no" : 2,
        } 
      },
      {
        "id": 2,
        "question": "Boli vas chrbat?",
        "answer" : {
          "yes": 4,
          "no" : -1,
        } 
      },
      {
        "id": 3,
        "question": "Boli vas velmi?",
        "answer" : {
          "yes": 4,
          "no" : -1,
        } 
      },
      {
        "id": 4,
        "question": "Naozaj?",
        "answer" : {
          "yes": 5,
          "no" : -1,
        } 
      },
      {
        "id": 5,
        "question": "Mate COVID-19?",
        "answer" : {
          "yes": -2,
          "no" : -1,
        } 
      },
  
    ];
  }

  // getQuotes(): Observable<HttpResponse<Quote[]>>{
  //   return this.http.get<Quote[]>(localUrl, {observe: 'response'});
  // }

  // getQuoteById(id: number): Observable<any> {
  //   return this.http.get<Quote>(localUrl + id).pipe(
  //     retry(3), catchError(this.handleError<Quote>('getquote')));
  // }
  
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  
  //     return of(result as T);
  //   };
  // }
}
