import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.page.html',
  styleUrls: ['./my-collection.page.scss'],
})
export class MyCollectionPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
  
    savedCollection_Data: any;

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
           this.getMySaved_Collection(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }





  getMySaved_Collection(uid){
    console.log(uid)
    this.configServ.postData('/mywishlist.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.savedCollection_Data = res.data;
      }
    }).catch( err => {
    });
  }

  rmto_wishlists(prod_id, wish_id){
     this.configServ.postData('/removewishlist.php', {"userid": this.user_id, "prodid": prod_id}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.checkLogin();
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
