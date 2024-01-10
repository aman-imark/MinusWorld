import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { IonInput, IonToolbar, LoadingOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { NavController, Platform, ToastController, AlertController, LoadingController } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';
import { EventService } from '../../../services/event.service';
import { PushnotiService } from '../../../services/pushnoti.service';


import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

import { UserLogin } from '../../../services/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})




export class LoginPage implements OnInit {
  @ViewChild("header") header: HTMLElement;
  // @ViewChild(IonContent) content: IonContent;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  userModal = new UserLogin();


  device_id: string;
  fcm_token: string;

  constructor(private navCtrl: NavController, private router: Router,
              public toastController: ToastController, private platform: Platform, public loadCtrl: LoadingController,
              public alrtCtrl: AlertController, public configServ: ConfigService, public eventServ: EventService, 
              public checkStr: SessionService, public pushNoti: PushnotiService, public element: ElementRef, 
              public renderer: Renderer2) { }

  
  ngOnInit() {
    // this.checkDeviceInfo();
  }


  ionViewWillEnter(){
    this.checkDeviceInfo();
    // this.checkFCMtoken();
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
  }


  onScroll(event) {
   if(this.platform.is('android')){
    if (event.detail.scrollTop >= 50) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
    }
   }
  }



  user_login(){
    this.userModal.deviceid = this.device_id; 
    this.userModal.fcmtoken = this.fcm_token;
    // this.userModal.fcmtoken = 'iOS device: dm-dcG1IEkmHqdO_upcKv3:APA91bFY3mdP7ZL1QxkMk7SdY-ohF45TbqPSy6jVtvCjc1_xG-PVvHwvQ7xBgfCIB9T6jRe-HN8bleDMxz_YCj1-18fh1D2nH25QZem5KrM_rXQd5iX8j-mAt90-o6R5VmoCDcgbz-HAc7WO3';

      console.table(this.userModal);
      this.configServ.show();
      this.configServ.postData('/login.php', this.userModal).then((res:any) => {  console.log(res);
        this.configServ.hide();
        if(res.status === "unauthorized"){
           this.presentToast(res.message);
        }else if(res.status === "success"){
           if(res.user.email != null && res.user.email != undefined  && res.user.email != ''){
               this.eventServ.publish(res.user);
               this.checkStr.setStore('user_dataMW', res.user);
               
               //  location.assign('/');
               //  location.reload();
               // this.router.navigate(['maintabs/tabs/tab1']);
               // this.navCtrl.navigateRoot('maintabs/tabs/tab1');
               // this.navCtrl.navigateRoot('/maintabs/tabs/tab1', { animated: true, animationDirection: 'forward' });
               // window.location.assign('/');  
              
               this.router.navigate(['maintabs/tabs/tab1']);
              // this.navCtrl.navigateRoot('');
              this.presentToast(res.message);
           }else{
              this.presentToast(res.message);
           }
        }else if(res.status === "required"){
          if(res.message.email && res.message.password){
             // console.log(res.message);
             this.presentToast('Email and Password both are required!');
          }else if(res.message.email){
             this.presentToast(res.message.email);
          }else if(res.message.password){
             this.presentToast(res.message.password);
          }else if(res.message.fcmtoken){
            this.presentToast(res.message.fcmtoken);
          }else if(res.message.deviceid){
            this.presentToast(res.message.deviceid);
          }else{
             this.presentToast('Try again!');
          }
        }else{
           this.presentToast('Somthing Wrong, Try again!');
        }
      }).catch( err => {
        this.presentToast(JSON.stringify(err.message));
      });
    }
  




  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }



  checkDeviceInfo(){
    this.checkStr.getStore('user_Device').then((data:any) => {   
    console.log(data);
     if(data != null || data != '' || typeof(data) != 'undefined'){
        this.device_id = data.device_id;
        // {
        //   "device_id": "1d655ec0d52697b9",
        //   "device_model": "sdk_gphone_arm64",
        //   "device_version": "11",
        //   "device_isVirtual": true,
        //   "platform": "Android"
        // }
     }else{
       this.presentToast('user device info empty!')
     }
    }, (reason) => {
    }).catch( err => {
    });
  }



  checkFCMtoken(){
    this.checkStr.getStore('user_FCMtoken').then((data:any) => {   
    console.log(data);
    // this.presentToast(data)
     if(data != null || data != '' || typeof(data) != 'undefined'){
       this.fcm_token = data;
      //  this.presentToast('FCM token set.')
     }else{
      //  this.presentAlert('FCM token not set in storage!')
       this.presentToast('!FCM token not set in storage.')
     }
    }, (reason) => {
    }).catch( err => {
    });
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
