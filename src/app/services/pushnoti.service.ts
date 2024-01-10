import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

import { SessionService } from '../services/session.service';




@Injectable({
  providedIn: 'root'
})
export class PushnotiService {


  // private router: Router, private navCtrl: Navigation

  setFcmToken: string;

  constructor(private router: Router, private platform: Platform, public checkStr: SessionService) { }





  initFCM_Push() {
      this.registerPush();
  }




  get_PushNotification() {
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }





  registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive  === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });



    // // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      if(token.value){
        this.setFcmToken = token.value;
        console.log('Push registration success, token: ' + token.value)
      }else{
      }
    });
 


    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error))
      });
  }

}
