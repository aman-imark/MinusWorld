import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_id: any;
    user_email: any
    user_img: any;

  isCartData: boolean;
  userCartData: any;
      userCart_Details: any;
      get_order_id: any;
      get_prod_id:  any;
      get_prod_type: any;


  kc_Data: any;



  constructor(private router: Router, public modalCtrl: ModalController, public toastController: ToastController, 
    private platform: Platform, public alrtCtrl: AlertController, 
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2) {}




  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.get_KC_Data()
  }



  
  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.get_KC_Data()
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
    if (event.detail.scrollTop >= 50) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
    }
  }
  }



  async get_KC_Data(){
    this.configServ.getData('/blog.php').then((res:any) => {   console.log(res);
      if(res.status === 'success'){
        if(res.result){
           this.kc_Data = res.result;
        }else{
           this.presentToast(res.msg);
        }
      }else{
        this.presentToast(res.msg);
      }
    }).catch( err => {
    });
  }




  

  goto_KnowledgeBlog_Details(kc_id, kc_title){
    this.router.navigate(['/kc-blog-cat'],{ queryParams : {"kc_id": kc_id, "kc_title": kc_title} });
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      mode: "md"
    });
    toast.present();
  }


}



