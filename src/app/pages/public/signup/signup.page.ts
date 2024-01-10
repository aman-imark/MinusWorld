import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { NavController, Platform, ToastController, AlertController, LoadingController } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { UserRegister } from '../../../services/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild("header") header: HTMLElement;
  @ViewChild(IonContent) content: IonContent;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  passwordType_c: string = 'password';
  passwordIcon_c: string = 'eye-off';


  terms_checkbox_value = '1';

  userModal = new UserRegister();



  constructor(private navCtrl: NavController, private router: Router,
    public toastController: ToastController, private platform: Platform, public alrtCtrl: AlertController, 
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2) 
    
    { 
      this.userModal.seller_checkbox = '1';
    }


    
    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
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
  


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPassword_c(){
    this.passwordType_c = this.passwordType_c === 'text' ? 'password' : 'text';
    this.passwordIcon_c = this.passwordIcon_c === 'eye-off' ? 'eye' : 'eye-off';
  }

  check_seller_checkbox_value(value){       
      if(value.detail.checked === true){
         this.userModal.seller_checkbox = '2';
      }else if(value.detail.checked === false){
         this.userModal.seller_checkbox = '1';
      }
  }

  check_terms_checkbox_value(value){       
    console.log(value.detail.checked);
    // console.log(value.detail['checked']);
    if(value.detail.checked === true){
       this.terms_checkbox_value = '2';
       console.log(this.terms_checkbox_value);
    }else if(value.detail.checked === false){
      this.terms_checkbox_value = '1';
      console.log(this.terms_checkbox_value);
    }
  }


  countChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }


  user_sign_up(){
    console.table(this.userModal);
    this.configServ.show();
    this.configServ.postData('/register.php', this.userModal).then((res:any) => {   console.log(res);
      this.configServ.hide();
      this.presentToast(res.message);
      if(res.status === "unauthorized"){
          this.presentToast(res.message);
      }else if(res.status === "success"){
         this.presentAlert(res.message);

        // if(res.user.email != null && res.user.email != undefined  && res.user.email != ''){
          // this.eventServ.publish(res.user);
          // this.checkStr.setStore('user_dataMW', res.user);
        //   //  this.checkStr.setStore('user_dataMW', res.user);
        //      //  location.reload();
        //      // this.router.navigate(['maintabs/tabs/tab1']);
        //      // this.navCtrl.navigateRoot('maintabs/tabs/tab1');
        //   //  window.location.assign('/');
        //      // this.navCtrl.navigateRoot('/maintabs/tabs/tab1', { animated: true, animationDirection: 'forward' });
        //   //  this.presentToast(res.message);
        // }else{
        //    this.presentToast(res.message);
        // }
      }else if(res.status === "required"){
        if(res.message.first_name && res.message.last_name  && res.message.email && res.message.pass){
           // console.log(res.message);
           this.presentToast(res.message.first_name);
        }else if(res.message.first_name){
           this.presentToast(res.message.first_name);
        }else if(res.message.last_name){
           this.presentToast(res.message.last_name);
        }else if(res.message.email){
           this.presentToast(res.message.email);
        }else if(res.message.pass){
           this.presentToast(res.message.pass);
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
    });
  }




  // user_sign_up(formData){
  //   this.configServ.postData('/register.php', formData.value).then((res:any) => {   console.log(res);
  //   this.presentToast(res.message);
  //     if(res.status === "unauthorized"){
  //         this.presentToast(res.message);
  //     }else if(res.status === "success"){
  //        this.presentAlert(res.message);

  //       // if(res.user.email != null && res.user.email != undefined  && res.user.email != ''){
  //         // this.eventServ.publish(res.user);
  //         // this.checkStr.setStore('user_dataMW', res.user);
  //       //   //  this.checkStr.setStore('user_dataMW', res.user);
  //       //      //  location.reload();
  //       //      // this.router.navigate(['maintabs/tabs/tab1']);
  //       //      // this.navCtrl.navigateRoot('maintabs/tabs/tab1');
  //       //   //  window.location.assign('/');
  //       //      // this.navCtrl.navigateRoot('/maintabs/tabs/tab1', { animated: true, animationDirection: 'forward' });
  //       //   //  this.presentToast(res.message);
  //       // }else{
  //       //    this.presentToast(res.message);
  //       // }
  //     }else if(res.status === "required"){
  //       if(res.message.first_name && res.message.last_name  && res.message.email && res.message.pass){
  //          // console.log(res.message);
  //          this.presentToast(res.message.first_name);
  //       }else if(res.message.first_name){
  //          this.presentToast(res.message.first_name);
  //       }else if(res.message.last_name){
  //          this.presentToast(res.message.last_name);
  //       }else if(res.message.email){
  //          this.presentToast(res.message.email);
  //       }else if(res.message.pass){
  //          this.presentToast(res.message.pass);
  //       }else{
  //          this.presentToast('Try again!');
  //       }
  //     }else if(res.status === "failed"){
  //         this.presentToast(res.message);
  //     }else{
  //         this.presentToast('Somthing Wrong, Try again!');
  //     }
  //   }).catch( err => {
  //     this.presentToast(JSON.stringify(err.message));
  //   });
  // }


  async presentAlert(message) {
    const alert = await this.alrtCtrl.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(['/']);
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/login']);
          }
        }
      ]
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



// {
//   "status": "required",
//   "message": {
//       "first_name": "The First name is required",
//       "last_name": "The Last name is required",
//       "email": "The Email is required",
//       "pass": "The Pass is required"
//   }
// }