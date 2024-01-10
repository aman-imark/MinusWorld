import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-my-bounties',
  templateUrl: './my-bounties.page.html',
  styleUrls: ['./my-bounties.page.scss'],
})
export class MyBountiesPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
  
    myBounties_Data: any;


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
           this.get_myBounties_Data(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }




  get_myBounties_Data(uid){
    this.configServ.postData('/buyerbounties.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.myBounties_Data = res.BountiesDetails;
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
