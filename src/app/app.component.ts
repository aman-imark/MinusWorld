import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';
import { MenuController, LoadingController } from '@ionic/angular';

import { NetworkService } from './services/network.service';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';
import { EventService } from './services/event.service';
import { PushnotiService } from './services/pushnoti.service';


import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Device } from '@awesome-cordova-plugins/device/ngx';
// import { Device } from '@capacitor/device';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn: boolean = false;
  userData: any;
    user_token: any;
    user_id: any;
    first_name: any;
    last_name: any;
    user_email: any
    user_img: any;
    user_phn: any;
    user_type: any;
    user_role: any;
    
    device_id: string;
    fcm_token: string;




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




  constructor(public alrtCtrl: AlertController, private navCtrl: NavController, private menu: MenuController, private router: Router,
              public configServ: ConfigService, public checkStr: SessionService, public eventServ: EventService, 
              public toastController: ToastController, public loadCtrl: LoadingController, private platform: Platform, private device: Device,
              public pushNoti: PushnotiService, public netServ: NetworkService) 
  
  {
    this.initializeApp();
  }



  initializeApp() {
    // await SplashScreen.show({
    //   showDuration: 2000,
    //   autoHide: true,
    // });
    
    this.platform.ready().then(() => {
      setTimeout(()=>{
        SplashScreen.hide({
          fadeOutDuration: 2000
        });
      }, 1000)
      StatusBar.setBackgroundColor({color: '#27F09D'});      
      // this.checkFCMtoken();
      // this.get_PushNotification();

      this.checkDeviceInfo();
      this.checkLogin();
      this.eventPublish();
    })
  }




  checkDeviceInfo(){
    this.checkStr.getStore('user_Device').then((data:any) => { 
      console.log(data)  
      // console.log('Init_device   '+JSON.stringify(data));
      if(data == null || data == '' || typeof(data) == 'undefined'){
        let deviceInfo = {
          device_id: this.device.uuid,
          device_model: this.device.model,
          device_version: this.device.version,
          device_isVirtual: this.device.isVirtual,
          platform: this.device.platform
        };
        this.checkStr.setStore('user_Device', deviceInfo);
      }else{ }
    }).catch( err => { });
  }




  checkFCMtoken(){  
    this.checkStr.getStore('user_FCMtoken').then((data:any) => {   
      console.log('Check_FCM:  '+JSON.stringify(data));
      if(data == null || data == '' || typeof(data) == 'undefined'){
         this.registerPush();
      }else{ }
    }).catch( err => { });
  }






  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => {   
      console.log(data);
      console.log(this.isLoggedIn)
      if(data != null || data != '' || typeof(data) != 'undefined'){
        if(data.userid){
          this.userData = data;
          this.isLoggedIn = true;
            this.first_name = this.userData.first_name;
            this.last_name = this.userData.last_name;
            this.user_email = this.userData.email;
            this.user_img = this.userData.user_img;
            this.user_phn = this.userData.phn;
            this.user_type = this.userData.user_type;
            this.user_role = this.userData.user_role;

            // this.get_UserProfile_Data(data.userid);
            if(this.user_type == '1') {
               this.menu.enable(false, 'guest');
               this.menu.enable(false, 'seller');
               this.menu.enable(true, 'buyer');
            } else if(this.user_type == '2') {
               this.menu.enable(false, 'guest');
               this.menu.enable(false, 'buyer');
               this.menu.enable(true, 'seller');
            } 
        }else{
          this.isLoggedIn = false;
          this.menu.enable(true, 'guest');
        }
      }else{
        this.isLoggedIn = false;
        this.menu.enable(true, 'guest');
      }
    }, (reason) => {
        this.isLoggedIn = false;
        this.menu.enable(true, 'guest');   
    }).catch( err => {
        this.isLoggedIn = false;
        this.menu.enable(true, 'guest');
    });
    this.navCtrl.navigateRoot(['/maintabs/tabs/tab1'])
  }
 



  // subscribe to event 
  eventPublish(){
        this.eventServ.currentEvent.subscribe((data: any) => {
          console.log(data);
          if(data.userid){
            this.userData = data;
            this.isLoggedIn = true;
              this.first_name = this.userData.first_name;
              this.last_name = this.userData.last_name;
              this.user_email = this.userData.email;
              this.user_img = this.userData.user_img;
              this.user_phn = this.userData.phn;
              this.user_type = this.userData.user_type;
              this.user_role = this.userData.user_role;

              if(data.user_type == '1') {                 
                 this.menu.enable(false, 'guest');
                 this.menu.enable(false, 'seller');
                 this.menu.enable(true, 'buyer');
              } else if(data.user_type == '2') {
                 this.menu.enable(false, 'guest');
                 this.menu.enable(false, 'buyer');
                 this.menu.enable(true, 'seller');
              }
          }else{ }
          //  console.log('user#:   '+ this.user_role +'   '+ this.isLoggedIn);    
        }); 
  }




  // get_UserProfile_Data(uid){
  //   this.configServ.postData('/profile.php', {"userid": uid}).then((res:any) => {  // console.log(res);
  //     console.log(res);
  //     if(res.status === 'success'){
  //       this.user_img = res.user.user_img;
  //       this.user_type = res.user.user_type;
  //       this.user_role = res.user.user_role;
  //       if(res.user.user_type == '1') {                 
  //          this.menu.enable(false, 'guest');
  //          this.menu.enable(false, 'seller');
  //          this.menu.enable(true, 'buyer');
  //       } else if(res.user.user_type == '2') {
  //          this.menu.enable(false, 'guest');
  //          this.menu.enable(false, 'buyer');
  //          this.menu.enable(true, 'seller');
  //       }
  //     }else{
  //     }
  //   }).catch( err => {
  //   });
  // }





  registerPush(){
    // https://devdactic.com/push-notifications-ionic-capacitor/
    // https://www.youtube.com/watch?v=YUr8pw0nO7Y
    // https://capacitorjs.com/docs/guides/push-notifications-firebase

    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        this.presentToast('No permission for FCM Push Notification!')
        // No permission for push granted
      }
    });
 


    PushNotifications.addListener('registration',(token: Token) => {
      console.log('My token Regs : ')
      console.log(token.value);
      // console.log('Push registration success, token: ' + token.value);
        if(token.value){
          this.fcm_token = token.value;

          if(this.platform.is('android')){

              this.checkStr.setStore('user_FCMtoken', this.fcm_token);
              // this.presentAlert('Token FCM(md)   '+JSON.stringify(this.fcm_token));
          }else if(this.platform.is('ios')){

              this.checkStr.setStore('user_FCMtoken', this.fcm_token);
              // this.presentAlert('Token FCM(iOS)   '+JSON.stringify(this.fcm_token));
              // example token: euMr8AbnlUeGoYvOI_qIk-:APA91bEDc0LqMpOQ8d3mGfuqVyBOWJwUIs0RiuRFuCsi3agvwZu0fHWvnYkgoY3G8tZUKEl_EeGmVtfbiIUCxKgH_c0tLXpopdXsW2Z5x-vyX3heuxB8d43-UMBc4_vm2ULjmHpySO-G
              // this.checkStr.setStore('user_FCMtoken', 'ios123455_notworking_APNkey');
          }else{
            this.presentAlert('Your device Platform not matched. (Android/iOS)')
          }
        }else{
          this.presentAlert('FCM token not setted!!');
        }
      }).catch( (er) => {
         this.presentAlert(JSON.stringify(er))
      });



    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
      this.presentAlert('FCm regs err: ' + JSON.stringify(error));
    }).catch( (er) => {
      this.presentAlert(JSON.stringify(er))
    });

 }




  get_PushNotification() {
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', async(notification: PushNotificationSchema) => {
          console.log(notification);
          // Push received: {"subtitle":"","badge":1,"id":"41E6ED6F-C14B-4AF7-AB2A-D1EE62B8262F","data":{"gcm.n.e":"1","aps":{"alert":{"body":"This is a test Notification of MinusWorlds app.\nWelcome to Minus Worlds! Your one-stop shop for rare games and knowledge! ","title":"MinusWorlds"},"mutable-content":1},"gcm.message_id":"1653560330326717","fcm_options":{"image":"https://minusworlds.com/images/logo.png"},"google.c.a.e":"1","google.c.a.ts":"1653560330","google.c.fid":"euMr8AbnlUeGoYvOI_qIk-","google.c.a.c_id":"4784614096789423277","google.c.a.udt":"0","google.c.sender.id":"689783261402","google.c.a.c_l":"Saurabh-Adam"},"body":"This is a test Notification of MinusWorlds app.\nWelcome to Minus Worlds! Your one-stop shop for rare games and knowledge! ","title":"MinusWorlds"}
          // this.presentAlert('Push received: ' + JSON.stringify(notification));  
          // {
          //   "id": "0:1653563652954243%48b419ac48b419ac",
          //   "data": {},
          //   "title": "MinusWorlds",
          //   "body": "Minus Worlds was started from scratch, ground up with the belief there was a better way for the video game community to interact and transact. Made by a collector, for the collectors. Founder, Daniel Allegra, a collector for three decades envisioned what was missing in the video game  a fixed price marketplace and hub for knowledge."
          // }        
      }).catch( (er) => {
         this.presentAlert(JSON.stringify(er))
      });



    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',async(notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log(notification.notification);
        // Action performed: {"title":"MinusWorlds","data":{"gcm.n.e":"1","aps":{"alert":{"title":"MinusWorlds","body":"This is a test Notification of MinusWorlds app.\nWelcome to Minus Worlds! Your one-stop shop for rare games and knowledge! "},"mutable-content":1},"google.c.a.c_id":"2759512467948731947","fcm_options":{"image":"https://minusworlds.com/images/logo.png"},"google.c.a.c_l":"Saurabh-Adam","google.c.fid":"euMr8AbnlUeGoYvOI_qIk-","google.c.sender.id":"689783261402","google.c.a.ts":"1653560928","google.c.a.udt":"0","google.c.a.e":"1","gcm.message_id":"1653560928752583"},"subtitle":"","badge":1,"id":"F819A472-1E58-40BB-B3E2-CD443A4E274F","body":"This is a test Notification of MinusWorlds app.\nWelcome to Minus Worlds! Your one-stop shop for rare games and knowledge! "}
        // {
        //   "id": "0:1653564159461346%48b419ac48b419ac",
        //   "data": {
        //       "google.delivered_priority": "high",
        //       "google.sent_time": "1653564159448",
        //       "google.ttl": "2419200",
        //       "google.original_priority": "high",
        //       "from": "689783261402",
        //       "collapse_key": "com.minus.worlds"
        //   }
        // }
      
        // this.presentAlert('Action performed: ' + JSON.stringify(notification.notification))
        // if (data.detailsId) {
        //   this.router.navigateByUrl('/notifications');
        // }

        if(this.isLoggedIn === true) {
           this.router.navigateByUrl('/notifications');
        }else{
          this.presentToast('!User not logged In, please login first.')
        }
      }).catch( (er) => {
         this.presentAlert(JSON.stringify(er))
      });


    // PushNotifications.getDeliveredNotifications().then(async(data) => {
    //       console.log(data)
    // }).catch( (er) => {
    //       // console.log(er);
    // });
  }




  async logout_Confirmation(){
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.menu.close();
          }
        }, {
          text: 'Logout',
          id: 'confirm-button',
          handler: () => {
            this.menu.close();
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }



  logout() {
    this.checkStr.removeStore('user_dataMW');
    this.checkStr.removeStore('user_myCart');
    this.checkStr.removeStore('user_FCMtoken');
    this.checkStr.removeStore('user_Device');
    // this.checkStr.clear();

    this.presentLoading(2000);
    this.isLoggedIn = false;
    this.menu.enable(true, 'guest');
    // this.router.navigate(['/load']);

    // setTimeout(() => {
    //   this.presentToast('Logout successfull.');
    // }, 4000);

    setTimeout(() => {
      location.replace('/maintabs/tabs/tab1');
    }, 1000);
  };





  async presentLoading(duration) {
    const loading = await this.loadCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: duration,
      backdropDismiss: true
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }





// Side_Menu_Bar click functuons
  loginClick(){
    this.menu.close();
    this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
    // this.router.navigate(['/login']);
  }
  registerClick(){
    this.menu.close();
    this.router.navigate(['/signup']);
  }
  dashboardClick(){
    this.menu.close();
    this.router.navigate(['/dashboard']);
  }
  profileClick(){
    this.menu.close();
    this.router.navigate(['/maintabs/tabs/tab5']);
    // this.router.navigate(['/maintabs/tabs/tab5']);
  }

//  Seller option 
  yourProductsClick(){
    this.menu.close();
    this.router.navigate(['/seller-products']);
  }
  soldOrdersClick(){
    this.menu.close();
    this.router.navigate(['/sold-orders']);
  }
  offersClick(){
    this.menu.close();
    this.router.navigate(['/offers']);
  }
  revenueClick(){
    // this.menu.close();
    // this.router.navigate(['/revenue']);
  }
  reportsClick(){
    // this.menu.close();
    // this.router.navigate(['/reports']);
  }

//  Buyer option 
  ordersClick(){
    this.menu.close();
    this.router.navigate(['/user-orders']);
  }
  saved_collectionClick(){
    this.menu.close();
    this.router.navigate(['/my-collection']);
  }
  buyerClick(){
    this.menu.close();
    this.router.navigate(['/buyer-offers']);
  }






//  Comman option 
  contactClick(){
    this.menu.close();
    this.router.navigate(['/contact']);
  }

  aboutClick(){
    this.menu.close();
    this.router.navigate(['/about-us']);
  }

  terms_ofuse_Click(){
    this.menu.close();
    this.router.navigate(['/terms-of-use']);
  }
  terms_ofsales_Click(){
    this.menu.close();
    this.router.navigate(['/terms-of-sales']);
  }
  returnPolicyClick(){
    this.menu.close();
    this.router.navigate(['/return-policy']);
  }
  privacyClick(){
    this.menu.close();
    this.router.navigate(['/privacy']);
  }

  settingClick(){
    this.menu.close();
    this.router.navigate(['/setting']);
  }






  async presentAlert(data) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      subHeader: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      mode: "md"
    });
    toast.present();
  }



}
