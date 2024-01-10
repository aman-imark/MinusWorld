import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
  
    notif_Data: any;
    routes: any;

    numOfData: number = 10;

  constructor(public toastCtrl: ToastController,private location: Location, private router : Router,
              public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
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
           this.getMy_notification(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }





  getMy_notification(uid){
    this.configServ.postData('/notification.php', {"uid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.notif_Data = res.result;
        console.log(this.notif_Data)
        // Object.keys(this.notif_Data[0].routes)
        // this.routes = this.notif_Data[0].routes;

      }else{
        this.presentToast(res.message);
      }      
      // else if(res.status === 'fail'){}
    }).catch( err => {
    });
  }


  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      event.target.complete(); 
    }, 2000); 
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
