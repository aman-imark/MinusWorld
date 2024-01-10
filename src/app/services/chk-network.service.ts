import { Injectable } from '@angular/core';


import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class ChkNetworkService {

  constructor() { }


  getNet(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
    
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      console.log('Network status:', status);
    };
  }
}
