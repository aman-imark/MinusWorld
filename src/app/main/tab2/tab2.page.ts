import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';
import { MwFilterPage } from '../../modals/mw-filter/mw-filter.page';
import { MwSortPage } from '../../modals/mw-sort/mw-sort.page';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ToastController } from '@ionic/angular';

import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Http, HttpResponse, HttpOptions } from '@capacitor-community/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;


  isLoggedIn: boolean;
  userData: any;
    user_id: any;
    user_email: any
    user_img: any;

  isCartData: boolean;
      userCart_Details: any;
      get_order_id: any;
      get_prod_id:  any;
      get_prod_type: any;


  MWstore_Data : any;

  sort_filter: any = {
    start: '',
    end: '',
    cid: '',
    min_price: '',
    max_price: '',
    price: ''
  };


  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2, private platform: Platform) { 
      // this.initFCM() 
    }


  ionViewWillLeave(){
    this.checkStr.removeStore('mwFilter');
    this.checkStr.removeStore('mwSort');
  }

  ionViewWillEnter(){
    this.postmanPaypal();
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.sort_filter['cid'] = '';
    this.sort_filter['min_price'] = '';
    this.sort_filter['max_price'] = '';
    this.sort_filter['price'] = '';
    this.get_MWstore_Data(this.sort_filter);
  }


  doRefresh(event) {
    // console.log('Begin async operation');
    this.checkLogin();
    setTimeout(() => {
      this.sort_filter['cid'] = '';
      this.sort_filter['min_price'] = '';
      this.sort_filter['max_price'] = '';
      this.sort_filter['price'] = '';
      console.log(this.sort_filter)
      this.get_MWstore_Data(this.sort_filter);
      event.target.complete();
    }, 2000);
  }

  

  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      // console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
        if(this.userData.email){
          this.isLoggedIn = true;
          this.user_id = this.userData.userid;
          this.user_img = this.userData.user_img;
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    },(reason) => {
        this.isLoggedIn = false;
    }
    ).catch( err => {
        this.isLoggedIn = false;
    });
  }

  

  
  onScroll(event) {
  if(this.platform.is('android')){
    if (event.detail.scrollTop >= 5) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'fixed');
      this.renderer.setStyle(this.toolbar['el'], 'top', '0px');
      // this.renderer.setStyle(this.toolbar['el'], 'padding', '4px 0px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'relative');
      // this.renderer.setStyle(this.toolbar['el'], 'padding', '4px 0px');
    }
  }
  }



  get_MWstore_Data(sort_filter_data){
    console.log(sort_filter_data)
    this.configServ.postData('/mwstore.php', sort_filter_data).then((res:any) => {  console.log(res);
      if(res.status === 'success'){
         if(res.result){
            this.MWstore_Data = res.result;
         }else{
            this.presentToast(res.msg);
         }
      }else{
         this.presentToast(res.msg);
      }
    }).catch( err => {
    });
    // { "cid": "", "min_price": "", "max_price": "", "price": "", "start": "", "end": ""}
    // {
    //   "cid": [
    //       "Clothing",
    //       "Art Prints",
    //       "Signature Series"
    //   ],
    //   "min_price": 28,
    //   "max_price": 32,
    //   "price": "low_high",
    //   "start": "",
    //   "end": ""
    // }
  }



  
  async sortClick(){
    const modal = await this.modalCtrl.create({
      component: MwSortPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss: true,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.3,
      breakpoints: [0, 0.3, 0.5]
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        // console.log(typeof data.data)
        if(data.data !== undefined){
        if(data.data.sort && data.data.clear === false){
          if(data.data.sort == 'relevance'){ console.log(data.data.sort);
          }else if(data.data.sort == 'ASC' || data.data.sort == 'DESC'){
              // this.sort_filter['sort'] = data.data.sort;
              // this.sort_filter['userid'] = this.user_id;
              this.sort_filter['price'] = data.data.sort; 
              console.log(this.sort_filter);            
              this.configServ.show();  
              this.get_MWstore_Data(this.sort_filter);
                setTimeout(() => {
                  this.configServ.hide();          
                }, 2000);
          }
        }
        }
      });
      return await modal.present();
  }


  async filterClick(){
    const modal = await this.modalCtrl.create({
      component: MwFilterPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 0.7, 1]
      });
      
      modal.onDidDismiss().then((data) => {
        console.log(data)
        // console.log(data.data);
        if(data.data.filter && data.data.clear === false && data.data.apply === true){
          this.sort_filter['min_price'] = data.data.filter.range.min;
          this.sort_filter['max_price'] = data.data.filter.range.max;

          // if(data.data.filter.range.min == '25'){
          //   this.sort_filter['min_price'] = "";
          // }else{
          //   this.sort_filter['min_price'] = data.data.filter.range.min;
          // }

          //  if(data.data.filter.range.max == '35'){
          //     this.sort_filter['max_price'] = "";
          //  }else{
          //     this.sort_filter['max_price'] = data.data.filter.range.max;
          //  }



          if(data.data.filter.categories || this.sort_filter['min_price'] || this.sort_filter['max_price']){
              // this.sort_filter['userid'] = this.user_id;
              this.sort_filter['cid'] = data.data.filter.categories;
              this.sort_filter['min_price'] = data.data.filter.range.min;
              this.sort_filter['max_price'] = data.data.filter.range.max;
            console.log(this.sort_filter);
            this.configServ.show();  
            this.get_MWstore_Data(this.sort_filter);
              setTimeout(() => {
                this.configServ.hide();          
            }, 2000);
          }
        }
      });
      return await modal.present();
  }







  goto_mwStoreProduct_Details(id, cat){
   console.log(id, cat);
   this.router.navigate(['/mwstore-details'],{ queryParams : {"pid": id, "type": "mwstore_product"} });
  }



  go_to_notifications(){
    this.router.navigate(['/notifications']);
    // this.navCtrl.navigateRoot('/notifications');
  }
  
  go_to_cart(){
    this.router.navigate(['/mycart']);
    // this.navCtrl.navigateRoot('/mycart');
  }
  
  go_to_profile(){
    this.router.navigate(['/maintabs/tabs/tab5']);
    // this.navCtrl.navigateRoot('/maintabs/tabs/tab5');
  }
  
  go_to_login(){
    this.router.navigate(['/login']);
    // this.navCtrl.navigateRoot('/login');
  }
  


//   initFCM() {
//     console.log('Initializing HomePage');

//     // // Request permission to use push notifications
//     // // iOS will prompt user and return if they granted permission or not
//     // // Android will just grant without prompting
//     PushNotifications.requestPermissions().then(result => {
//       console.log(result)
//       if (result.receive === 'granted') {
//         console.log('Notification Granted.');
//         // Register with Apple / Google to receive push via APNS/FCM
//         PushNotifications.register();
//       } else {
//         console.log('Notification Denied!');
//         // Show some error
//       }
//     });

//     // // On success, we should be able to receive notifications
//     PushNotifications.addListener('registration',
//       (token: Token) => {
//         console.log('Push registration success, token: ' + token.value)
//         alert('Push registration success, token: ' + token.value);
//       }
//     );

//     // Some issue with our setup and push will not work
//     PushNotifications.addListener('registrationError',
//       (error: any) => {
//         console.log('Error on registration: ' + JSON.stringify(error))
//         alert('Error on registration: ' + JSON.stringify(error));
//       }
//     );

//     // Show us the notification payload if the app is open on our device
//     PushNotifications.addListener('pushNotificationReceived',
//       (notification: PushNotificationSchema) => {
//         alert('Push received: ' + JSON.stringify(notification));
//       }
//     );

//     // Method called when tapping on a notification
//     PushNotifications.addListener('pushNotificationActionPerformed',
//       (notification: ActionPerformed) => {
//         alert('Push action performed: ' + JSON.stringify(notification));
//       }
//     );
// }



postmanPaypal(){
  // nativeHeaders = {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${token}`
  // };

  // let Username = 'ASehCgwOA3FVWt_QLxyR2NqQES2rBVar0PNwi8P5vYWIoJ-dWuxi6XC-qZenP3wN35Atd-F1LcQStya2';
  // let Password = 'EPmTJlriIHVjSF-swpNLrITztVjPLfc26gYsR1aTvyH9KPiwwxZxZAWHnsMK0lwEM35VhX9Ph5cNQO2U';

  let nativeHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic QVNlaENnd09BM0ZWV3RfUUx4eVIyTnFRRVMyckJWYXIwUE53aThQNXZZV0lvSi1kV3V4aTZYQy1xWmVuUDN3TjM1QXRkLUYxTGNRU3R5YTI6RVBtVEpscmlJSFZqU0Ytc3dwTkxySVR6dFZqUExmYzI2Z1lzUjFhVHZ5SDlLUGl3d3haeFpBV0huc01LMGx3RU0zNVZoWDlQaDVjTlFPMlU='
   };

  let body = {
    'grant_type' : 'client_credentials'
  }

  //  headers : {'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*', 'enctype': 'application/x-www-form-urlencoded'},
    


          Http.request({url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',  method: 'POST',
                       data: body, headers: nativeHeaders }).then(data => {

              console.log(data);                    
          }, (er) => {
              console.log(er);
             
          }).catch(err => {
              console.log(err);
             
          });
      
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
