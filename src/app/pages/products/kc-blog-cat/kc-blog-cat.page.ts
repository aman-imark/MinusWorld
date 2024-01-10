import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-kc-blog-cat',
  templateUrl: './kc-blog-cat.page.html',
  styleUrls: ['./kc-blog-cat.page.scss'],
})
export class KcBlogCatPage implements OnInit {

  
  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    page_title: any;
    kc_blogCat_Data: any;
    kc_blogCat_Data_length: number;
    numOfData: number = 20;

      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2, private platform: Platform) { }



    ionViewWillEnter(){
      this.checkLogin();
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.page_title = res.kc_title
        this.KCenter_BlogCategory_Data(res.kc_id);
       });
    }


    checkLogin(){
      this.checkStr.getStore('user_dataMW').then((data:any) => { 
        console.log(data);
        if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
          if(this.userData.email){
             this.isLoggedIn = true;
             this.user_id = this.userData.userid;
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }




  KCenter_BlogCategory_Data(bc_id){
      this.configServ.postData('/blog_category.php', {"id": bc_id}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.kc_blogCat_Data = res.result;
          this.kc_blogCat_Data_length = this.kc_blogCat_Data.length;
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
  }


  
  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      console.log(this.numOfData);
      event.target.complete(); 
      // if (this.kc_blogCat_Data_length === this.kc_blogCat_Data_length) {
      //   event.target.disabled = true;
      //   this.presentToast('No more data to load.')
      // }
    }, 2000); 
  }

  

  goto_kc_blogDetials(kc_blg_id){
    console.log(kc_blg_id);
    this.router.navigate(['/kc-blog-details'],{ queryParams : {"kc_blg_id": kc_blg_id} });
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
