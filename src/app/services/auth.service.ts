import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor() { }

  async getStore(key_name: string): Promise<{ value: any }>{
    const ret = await Preferences.get({ key: key_name });
    return JSON.parse(ret.value);
}


async checkUser(key_name: string): Promise<{ value: any }>{
  const ret = await Preferences.get({ key: key_name });
  return JSON.parse(ret.value);

  }
 


  isLoggedIn(){
     return this.currentUser != null;
  }

  logout(){
    this.currentUser = null;
  }


  isBuyer_User(){
    // return this.currentUser.role === 1;
  }

  isSeller_User(){
    // return this.currentUser.role === 2;
  }


}








export interface User{
    userid: number,
    first_name: string,
    last_name: string,
    email: string,
    user_img: string,
    phn: number,
    user_type: number,
    user_role: string
}

// {
//   "userid": "9",
//   "first_name": "Debasis",
//   "last_name": "Satpathy",
//   "email": "debasis@thoughtmedia.com",
//   "user_img": "https://minusworlds.com/uploads/2104177671_1.jpg",
//   "phn": "1234567890",
//   "user_type": "2",
//   "user_role": "Seller"
// }
