import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core'

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getUser() {
    return this.getItem('user');
  }

  async getItem(item: string) {
    const ret = await Storage.get({ key: item });
    return JSON.parse(ret.value);
  }
  
  async setObject(keyToSave: string, objectToSave: object) {
    if (objectToSave == undefined)
      return;
    await Storage.set({
      key: keyToSave,
      value: JSON.stringify(objectToSave)
    });
  }
  
  async setItem(keyToSave: string, itemToSave: string) {
    if (itemToSave == undefined)
      return;
    await Storage.set({
      key: keyToSave,
      value: itemToSave
    });
  }
  
  async removeItem(item: string) {
    await Storage.remove({ key: item });
  }
}
