import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ConfigService } from '../../../services/config.service';

import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";

import { UserContactUs } from '../../../services/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  thanks_active = false;
  fb_link: any;
  tw_link: any;
  insta_link: any;

  userModal = new UserContactUs();

  constructor(public toastCtrl: ToastController,private location: Location, 
    public configServ: ConfigService) 
    { }


  ionViewWillEnter(){
      this.get_SocailMedia_Data();
  }


  contact_usForm(){
    console.table(this.userModal);
    this.configServ.postData('/support.php', this.userModal).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === "unauthorized"){
          this.presentToast(res.message);
      }else if(res.status === "success"){
          this.thanks_active = true;
          this.presentToast(res.message);
      }else if(res.status === "required"){
        if(res.message.name && res.message.email  && res.message.phn){
           this.presentToast(res.message.name);
        }else if(res.message.name){
           this.presentToast(res.message.name);
        }else if(res.message.email){
           this.presentToast(res.message.email);
        }else if(res.message.phn){
           this.presentToast(res.message.phn);
        }else{
           this.presentToast('Try again!');
        }
      }else if(res.status === "failed"){
          this.presentToast(res.message);
      }else{
          this.presentToast('Somthing Wrong, Try again!');
      }
      
    }).catch( err => {
    });
  }


  async get_SocailMedia_Data(){
    this.configServ.getData('/socialmedia.php').then((res:any) => {  console.log(res);
      if(res.status === 'success'){
        this.fb_link = res.SocialMedia[0].url;
        this.tw_link = res.SocialMedia[1].url;
        this.insta_link  = res.SocialMedia[2].url;
      }else{
 
      }
    }).catch( err => {
    });
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
