import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';

import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

import { UserPwdForgot } from '../../../services/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  userModal = new UserPwdForgot();

    constructor(private navCtrl: NavController, private router: Router,
              public toastController: ToastController, private platform: Platform,
              public alertCtrl: AlertController, public configServ: ConfigService) { }

  
  ionViewWillEnter(){
  }

  
  // async ionViewWillEnter(){
  //   setTimeout(() => {
  //     this.content.scrollToTop(400);
  //    }, 200);
  // }

  forgot_password(){
    console.table(this.userModal);
    this.configServ.show();
    this.configServ.postData('/forgot.php', this.userModal).then((res:any) => {   console.log(res);
      this.configServ.hide();
      if(res.status === "unauthorized"){
        this.presentToast(res.message);
      }else if(res.status === "success"){
          this.presentAlert(res.status, res.message);
      }else if(res.status === "required"){
        if(res.message.email){
          this.presentToast(res.message.email);
        }else{
          this.presentToast('Try again!');
        }
      }else if(res.status === "failed"){
          this.presentToast(res.message);
      }else{
          this.presentToast('Somthing Wrong, Try again!');
      }
    }).catch( err => {
      this.presentToast(JSON.stringify(err.message));
       // alert(JSON.stringify(err));
    });
  }



















  // forgot_password(formData){
  //   this.configServ.show();
  //   console.log(formData.value);
  //   this.configServ.postData('/forgot.php', formData.value).then((res:any) => {  // console.log(res);
  //     this.configServ.hide();
  //     if(res.status === "unauthorized"){
  //       this.presentToast(res.message);
  //     }else if(res.status === "success"){
  //       if(res.user.email != null && res.user.email != undefined  && res.user.email != ''){
  //         this.presentToast(res.message.email);
  //       }else{
  //         this.presentToast(res.message);
  //       }
  //     }else if(res.status === "required"){
  //       if(res.message.email){
  //         this.presentToast(res.message.email);
  //       }else{
  //         this.presentToast('Try again!');
  //       }
  //     }else if(res.status === "failed"){
  //         this.presentToast(res.message);
  //     }else{
  //         this.presentToast('Somthing Wrong, Try again!');
  //     }
  //   }).catch( err => {
  //     this.presentToast(JSON.stringify(err.message));
  //      // alert(JSON.stringify(err));
  //   });
  // }



  async presentAlert(status, message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      subHeader: status,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      mode: "md"
    });
    toast.present();
  }
  

  ngOnInit() {
  }

}
