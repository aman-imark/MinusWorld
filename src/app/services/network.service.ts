import { Injectable } from '@angular/core';

import { Network } from '@capacitor/network';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);


  constructor(private toastController: ToastController, private platform: Platform) 


  { 
    this.platform.ready().then(() => {
      this.initNetworkEvents();
      // let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      // this.status.next(status);
    });
  }



  getNet(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      console.log('Network status:', status);
      return status;
    };
  }



  private initNetworkEvents() {
    Network.getStatus().then((data) => {
      console.log(data)
      return data;
      // if (this.status.getValue() === ConnectionStatus.Online) {
      //   console.log('WE ARE OFFLINE');
      //   this.updateNetworkStatus(ConnectionStatus.Offline);
      // }
    });
 
    // Network.onConnect().subscribe(() => {
    //   if (this.status.getValue() === ConnectionStatus.Offline) {
    //     console.log('WE ARE ONLINE');
    //     this.updateNetworkStatus(ConnectionStatus.Online);
    //   }
    // });
  }
 
  // private async updateNetworkStatus(status: ConnectionStatus) {
  //   this.status.next(status);
 
  //   let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
  //   let toast = this.toastController.create({
  //     message: `You are now ${connection}`,
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //   toast.then(toast => toast.present());
  // }
 
  // public onNetworkChange(): Observable<ConnectionStatus> {
  //   return this.status.asObservable();
  // }
 
  // public getCurrentNetworkStatus(): ConnectionStatus {
  //   return this.status.getValue();
  // }


}
