import { Injectable } from '@angular/core';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _registratingUser: User;
  private _userLoggedIn: User;
  private _refreshToken: string;
  private _accessToken: string;

  constructor() { }

  public get registratingUser() { return this._registratingUser }
  public set registratingUser(user: User) { this._registratingUser = user }

  public get userLoggedIn() { return this._userLoggedIn }
  public set userLoggedIn(user: User) { this._userLoggedIn = user }

  public get refreshToken() { return this._refreshToken }
  public set refreshToken(token: string) { this._refreshToken = token }

  public get accessToken() { return this._accessToken }
  public set accessToken(token: string) { this._accessToken = token }
}
