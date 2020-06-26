import { Injectable } from '@angular/core';
import { User } from './models/User';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _registratingUser: User;
  private _userLoggedIn: User;
  private _refreshToken: string;
  private _accessToken: string;

  constructor(private storageService: StorageService, private router: Router) { }

  public get registratingUser() { return this._registratingUser }
  public set registratingUser(user: User) { this._registratingUser = user }

  public get userLoggedIn() { return this._userLoggedIn }
  public set userLoggedIn(user: User) { this._userLoggedIn = user }

  public get refreshToken() { return this._refreshToken }
  public set refreshToken(token: string) { this._refreshToken = token }

  public get accessToken() { return this._accessToken }
  public set accessToken(token: string) { this._accessToken = token }

  loginSavedUser() { 
    this.storageService.getUser().then(
      (user: User) => { 
        if (user != null) {
          console.log("User found: ", user);
          this.userLoggedIn = user;
          this.router.navigateByUrl('dashboard')
        }
      }
    )
  }

  login(responseBody: object) {
    this.userLoggedIn = new User(
      responseBody['user'].name, responseBody['user'].email, null, responseBody['user'].sex, responseBody['user'].birthday
    );
    this.accessToken = responseBody['access_token'];
    this.refreshToken = responseBody['refresh_token'];

    this.storageService.setObject('user', this.userLoggedIn);
    this.storageService.setItem('access_token', this.accessToken)
    this.storageService.setItem('refresh_token', this.refreshToken)
  }

  logout() {
    this.storageService.removeItem("user");
    this.storageService.removeItem("access_token");
    this.storageService.removeItem("refresh_token");
    this.userLoggedIn = undefined;
    this.router.navigateByUrl('/')
  }
}
