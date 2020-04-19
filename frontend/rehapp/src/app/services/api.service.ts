import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Quote } from '../../assets/data/quote'
import { Observable, of } from 'rxjs'

import { catchError, retry } from 'rxjs/operators'
import { Question } from './models/question';


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


  // getQuestions(): Observable<Object> {
  //   return this.http.get(url+"questions");
  // }


  getQuestions(): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(url+"questions");
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
