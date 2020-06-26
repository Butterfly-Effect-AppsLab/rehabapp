import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core'
import { Observable } from 'rxjs';
import { from } from 'rxjs';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getUser() {
    return this.getObject('user');
  }

  async getObject(keyToGet: string) {
    const ret = await Storage.get({ key: keyToGet });
    return JSON.parse(ret.value);
  }

  async getItem(keyToGet: string) {
    const { value } = await Storage.get({ key: keyToGet });
   return value; 
  }
  
  async setObject(keyToSet: string, objectToSet: object) {
    if (objectToSet == undefined)
      return;
    await Storage.set({
      key: keyToSet,
      value: JSON.stringify(objectToSet)
    });
  }
  
  async setItem(keyToSet: string, itemToSet: string) {
    if (itemToSet == undefined)
      return;
    await Storage.set({
      key: keyToSet,
      value: itemToSet
    });
  }
  
  async removeItem(item: string) {
    await Storage.remove({ key: item });
  }

  getAccessToken(): Observable<any> {
    return from(this.getItem('access_token'));
  }
 
  getrefreshToken(): Observable<any> {
    return from(this.getItem('refresh_token'));
  }
}
