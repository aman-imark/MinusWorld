import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { Location } from "@angular/common";

import { UserPwdUpdate } from '../../../services/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
    

    upadeData_pass: any;

    old_pass;
    new_pass;
    con_pass;

    passwordTypeO: string = 'password';
    passwordIconO: string = 'eye-off';

    passwordTypeN: string = 'password';
    passwordIconN: string = 'eye-off';

    passwordTypeC: string = 'password';
    passwordIconC: string = 'eye-off';


    userModal = new UserPwdUpdate();
    
    constructor(private router: Router, public modalCtrl: ModalController, public toastController: ToastController, 
      private platform: Platform, public alrtCtrl: AlertController,  private navCtrl: NavController,
      public configServ: ConfigService, public checkStr: SessionService,  private location: Location)
    
      { }


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
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }

    



    O_hideShowPassword() {
      this.passwordTypeO = this.passwordTypeO === 'text' ? 'password' : 'text';
      this.passwordIconO = this.passwordIconO === 'eye-off' ? 'eye' : 'eye-off';
    }

    N_hideShowPassword() {
      this.passwordTypeN = this.passwordTypeN === 'text' ? 'password' : 'text';
      this.passwordIconN = this.passwordIconN === 'eye-off' ? 'eye' : 'eye-off';
    }


    C_hideShowPassword() {
      this.passwordTypeC = this.passwordTypeC === 'text' ? 'password' : 'text';
      this.passwordIconC = this.passwordIconC === 'eye-off' ? 'eye' : 'eye-off';
    }




  password_change(){
    this.userModal.userid = this.user_id;
    console.table(this.userModal);
    this.configServ.show();
          this.configServ.postData('/changepassword.php', this.userModal).then((res:any) => {  console.log(res);
          this.configServ.hide();

              if(res.status === "unauthorized"){
                  this.presentToast(res.message);
              }else if(res.status === "success"){
                  this.presentToast('Password is updated Successfully.');
                  this.navCtrl.navigateBack(['/maintabs/tabs/tab5'])
              }else if(res.status === "required"){
                      if(res.message.con_pass && res.message.new_pass && res.message.old_pass){
                          // console.log(res.message);
                           this.presentToast(res.message.old_pass);
                      }else if(res.message.old_pass){
                           this.presentToast(res.message.old_pass);
                      }else if(res.message.new_pass){
                        this.presentToast(res.message.new_pass);
                      }else if(res.message.con_pass){
                           this.presentToast(res.message.con_pass);
                      }else{
                           this.presentToast('Try again!');
                      }
                }else if(res.status === "invalid"){
                  this.presentToast(res.message);
                }else{
                   this.presentToast(res.message);
                }
          }).catch( err => {
                 this.presentToast(JSON.stringify(err.message));
          });
  }


  myBackButton(){
    this.location.back();
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
