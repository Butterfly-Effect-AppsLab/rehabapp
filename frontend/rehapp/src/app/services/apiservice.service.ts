import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { API_URL } from './api.config'
import { TreeComponent } from './models/Tree';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})

export class APIService {

  private _checksum: String;
  private _questions: Array<TreeComponent>;

  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'jwt-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  public async getTree(){
    if(this.questions == undefined){   
      await this.http.get<any>(API_URL + "questions", { observe: 'response' }).toPromise().then((res)=>{
        this.questions = res.body['questions'];      
      });
    }
  }

  // public async getTree(): Promise<any> {
  //   return await this.http.get<any>(API_URL + "questions", { observe: 'response' }).toPromise();
  // }

  public get questions(){return this._questions}
  public set questions(questions){this._questions = questions}

  public set checksum(checksum){this._checksum = checksum}
}
