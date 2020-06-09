import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core'
import { StateService } from 'src/app/services/state-service.service';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account-service.service';

const { Storage } = Plugins;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  user: User;
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {
    this.loggedIn = true;
    this.getUser().then((item) => {
      if (item == null) {
        this.user = this.accountService.userLoggedIn;
        this.setObject("user", this.user);
        this.setItem("access_token", this.accountService.accessToken);
        this.setItem("refresh_token", this.accountService.refreshToken);
      }
      else {
        this.user = new User(item['name'], item['email'], null);
      }
    })
  }

  ngOnInit() {
  }
  
  logout() {
    this.removeItem("user");
    this.removeItem("access_token");
    this.removeItem("refresh_token");
    this.user = new User("User#"+Math.floor(Math.random() * Math.floor(8192)));
    this.loggedIn = false;
  }

  async getUser() {
    const ret = await Storage.get({ key: 'user' });
    return JSON.parse(ret.value);
  }
  
  async setObject(keyToSave: string, objectToSave: object) {
    await Storage.set({
      key: keyToSave,
      value: JSON.stringify(objectToSave)
    });
  }
  
  async setItem(keyToSave: string, itemToSave: string) {
    await Storage.set({
      key: keyToSave,
      value: itemToSave
    });
  }
  
  async removeItem(item: string) {
    await Storage.remove({ key: item });
  }
}


