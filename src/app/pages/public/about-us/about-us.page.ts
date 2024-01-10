import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';

import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  dym_content: any;

  about_thumbimg: any;
  about_heading: any;
  about_content: any;

       whatwedo_thumbimg: any;
       whatwedo_heading: any;
       whatwedo_content: any;

  ourvision_thumbimg: any;
  ourvision_heading: any;
  ourvision_content: any;

      ourhistory_thumbimg: any;
      ourhistory_heading: any;
      ourhistory_content: any;

  constructor(private navCtrl: NavController, private router: Router,
    public toastController: ToastController, private platform: Platform,
    public alrtCtrl: AlertController, public configServ: ConfigService) { }


  ionViewWillEnter() {
    this.getAboutUsData();
  }
  
  async getAboutUsData(){
      this.configServ.getData('/aboutus.php').then((res:any) => {  // console.log(res);

        if(res.status === 'success'){
          this.dym_content = res.about_heading;

            this.about_thumbimg = res.about_thumbimg;
            this.about_heading = res.about_heading;
            this.about_content = res.about_content;
              this.whatwedo_thumbimg = res.whatwedo_thumbimg;
              this.whatwedo_heading = res.whatwedo_heading;
              this.whatwedo_content = res.whatwedo_content;
            this.ourvision_thumbimg = res.ourvision_thumbimg;
            this.ourvision_heading = res.ourvision_heading;
            this.ourvision_content = res.ourvision_content;
              this.ourhistory_thumbimg = res.ourhistory_thumbimg;
              this.ourhistory_heading = res.ourhistory_heading;
              this.ourhistory_content = res.ourhistory_content;
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
