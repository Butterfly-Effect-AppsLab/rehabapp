import { Injectable } from '@angular/core';
import { Diagnose } from './models/Tree';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private _excercise: Diagnose;
  private _excerciseCount: number;
  private _videos: Array<any> = [];

  constructor() { }

  public get excercise() { return this._excercise }
  public set excercise(excercise: Diagnose) { this._excercise = excercise }

  public get excerciseCount() { return this._excerciseCount }
  public set excerciseCount(excerciseCount: number) { this._excerciseCount = excerciseCount }
  
  public get videos() { return this._videos }
  public set videos(videos: Array<any>) { this._videos = videos }

  
}
