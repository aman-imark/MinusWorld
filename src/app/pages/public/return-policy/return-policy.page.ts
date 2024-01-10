import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.page.html',
  styleUrls: ['./return-policy.page.scss'],
})
export class ReturnPolicyPage implements OnInit {

  dym_content: any;

  constructor(private navCtrl: NavController, private router: Router,
    public toastController: ToastController, private platform: Platform,
    public alrtCtrl: AlertController, public configServ: ConfigService) { }


  ionViewWillEnter() {
    this.getTermsOfUseData();
  }
  
  async getTermsOfUseData(){
      this.configServ.getData('/returnpolicy.php').then((res:any) => {  // console.log(res);
        if(res.status === 'success'){
          this.dym_content = res.content;
        }else{
           this.presentToast(res.status);
        }
      }).catch( err => {
        // alert(JSON.stringify(err));
      });
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
