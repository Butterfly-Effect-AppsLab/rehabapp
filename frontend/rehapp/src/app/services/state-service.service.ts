import { Injectable } from '@angular/core';
import { Question } from './models/Tree';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {

  private _actualSubpart: BehaviorSubject<Question> = new BehaviorSubject<Question>(null);
  constructor() { }

  set actualSubpart(state: BehaviorSubject<Question>) {
    this._actualSubpart = state;
  } 

  get actualSubpart(): BehaviorSubject<Question> {
    return this._actualSubpart;
  }
}