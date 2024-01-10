import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit {
  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    YourOrders_Data: any;
    MWStoreOrders_Data: any;

  value_segmentChanged = 'your_orders';



  constructor(public toastCtrl: ToastController,private location: Location, 
              public configServ: ConfigService, public checkStr: SessionService,public element: ElementRef, 
              public renderer: Renderer2, private platform: Platform) { }


  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
  }
            


  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
      this.userData = data;
        if(this.userData.email){
           this.isLoggedIn = true;
           this.user_id = this.userData.userid;
           this.getUserOrders_Data(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
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



  async segmentChanged(ev: any) { 
    // console.log('Segment changed', ev); 
    console.log('Segment changed', this.value_segmentChanged); 
  } 



  getUserOrders_Data(uid){
    this.configServ.postData('/orders.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.YourOrders_Data = res.YourOrders.your_orders_details;
        this.MWStoreOrders_Data = res.MWStoreOrders.mw_store_orders_details;
      }else{
      }
    }).catch( err => {
    });
    // {
    //   "status": "success",
    //   "YourOrders": {
    //       "message": "No Results Found",
    //       "your_orders_details": []
    //   },
    //   "MWStoreOrders": {
    //       "message": "No Results Found"
    //   }
    // }
  }


  myBackButton(){
    this.location.back();
  }


  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      mode: "md"
    });
    toast.present();
  }
  orders

  ngOnInit() {
  }

}
