import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor() { }


// for object data set
  async setStore(key_name: string, key_data: any){
      await Preferences.set({ key: key_name, value: JSON.stringify(key_data) });
  }
  

  async getStore(key_name: string): Promise<{ value: any }>{
      const ret = await Preferences.get({ key: key_name });
      return JSON.parse(ret.value);
  }


  async removeStore(key_name: string){
    await Preferences.remove({ key: key_name });
  }


  async clear() {
    await Preferences.clear();
  }




//  for single string data
  // async setStore(key_name: string, key_data: string){
  //   // const setName1 = async () => {
  //   //   await Storage.set({ key: 'name', value: 'Max' });
  //   // };
  //     await Storage.set({ key: key_name, value: key_data });
  // }


  // async getStore(key_name: string): Promise<{ value: any }>{
  //   // const checkName1 = async () => {
  //   //   const { value } = await Storage.get({ key: 'name' });
  //   // };
  //     const checkName = await Storage.get({ key: key_name });
  //     return checkName;
  // }

  // async removeStore(key_name: string){
  //   // const removeName = async () => {
  //   //   await Storage.remove({ key: 'name' });
  //   // };
  //      await Storage.remove({ key: key_name });
  // }
   

  // https://edupala.com/ionic-capacitor-storage/

// async setString(key: string, value: string) {
//     await Storage.set({ key, value });
// }

// async getString(key: string): Promise<{ value: any }> {
//     return (await Storage.get({ key }));
// }

// async setObject(key: string, value: any) {
//     await Storage.set({ key, value: JSON.stringify(value) });
// }

// async getObject(key: string): Promise<{ value: any }> {
//     const ret = await Storage.get({ key });
//     return JSON.parse(ret.value);
// }


// async removeItem(key: string) {
//     await Storage.remove({ key });
// }

// async clear() {
//     await Storage.clear();
// }

}
