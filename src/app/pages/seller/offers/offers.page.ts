import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";



@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
  
    Seller_Offers_Data: any;

    constructor(public toastCtrl: ToastController,private location: Location, private router : Router,
      public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
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
           this.getSellerOffer(this.user_id);
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

  
  getSellerOffer(uid){
    this.configServ.postData('/selleroffer.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.Seller_Offers_Data = res.Offer_details;
      }
    }).catch( err => {
    });
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
