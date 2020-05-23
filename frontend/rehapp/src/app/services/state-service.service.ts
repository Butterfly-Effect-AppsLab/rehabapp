import { Injectable } from '@angular/core';
import { Question, TreeComponent } from './models/Tree';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _actualSubpart: BehaviorSubject<Question> = new BehaviorSubject<Question>(null);
  private _checksum: String;
  private _questions: object;

  constructor() {

  }

  set actualSubpart(state: BehaviorSubject<Question>) {
    this._actualSubpart = state;
  } 

  get actualSubpart(): BehaviorSubject<Question> {
    return this._actualSubpart;
  }

  public get questions() { return this._questions }
  public set questions(questions) { this._questions = questions }

  public get checksum() { return this._checksum } 
  public set checksum(checksum) { this._checksum = checksum }
}
