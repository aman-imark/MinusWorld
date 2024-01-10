import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-sold-orders',
  templateUrl: './sold-orders.page.html',
  styleUrls: ['./sold-orders.page.scss'],
})
export class SoldOrdersPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    RecentSales_Data: any;
    Delivered_Data: any;
    Cancelled_Data: any;

  value_segmentChanged = 'recent_sales';

  constructor(public toastCtrl: ToastController,private location: Location, 
              public configServ: ConfigService, public checkStr: SessionService,public element: ElementRef, 
              public renderer: Renderer2, private platform: Platform) { }


  ionViewWillEnter(){
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
           this.getSold_Orders_Data(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }





  async segmentChanged(ev: any) { 
    // console.log('Segment changed', ev); 
    console.log('Segment changed', this.value_segmentChanged); 
  } 



  getSold_Orders_Data(uid){
    this.configServ.postData('/soldorder.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.RecentSales_Data = res.RecentSales.product_details;
        this.Delivered_Data = res.Delivered.product_details;
        this.Cancelled_Data = res.Cancelled.product_details;
      }else{
      }
    }).catch( err => {
    });
    // {
    //   "status": "success",
    //   "RecentSales": {
    //       "message": "No Results Found",
    //       "product_details": []
    //   },
    //   "Delivered": {
    //       "message": "No Results Found",
    //       "product_details": []
    //   },
    //   "Cancelled": {
    //       "message": "No Results Found",
    //       "product_details": []
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

  ngOnInit() {
  }

}
