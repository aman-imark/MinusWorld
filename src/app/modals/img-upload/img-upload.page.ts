import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';
import { EventService } from '../../services/event.service';

import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.page.html',
  styleUrls: ['./img-upload.page.scss'],
})
export class ImgUploadPage implements OnInit {
  @Input() user_id: number;
  @Input() imageData: any;


    isPhotoUpdated: boolean = false;

  post_uploadImgData: any;
  update_nativeStorage: any;

  constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
    public configServ: ConfigService, public checkStr: SessionService, public modalCtrl: ModalController, 
    public eventServ: EventService, private navCtrl: NavController,
    private sanitizer : DomSanitizer) {this.configServ.hide(); }


    ionViewWillEnter(){
      this.post_uploadImgData = {"userid" :this.user_id, "user_img" : this.imageData};
    }



  upload_userImage(){
    // https://gist.github.com/fazlurr/9802071
    // https://bytenota.com/php-save-an-image-file-from-base64-string/
    // https://www.codegrepper.com/code-examples/php/php+base64+image+to+save+file
    // https://www.php.net/manual/en/function.base64-decode.php

    // https://www.youtube.com/watch?v=tph5Nk4Ab1g
    // https://forum.ionicframework.com/t/ionic-capacitor-file-upload-on-php-server-using-formdata-or-file-plugin/211231
    // https://devdactic.com/ionic-image-upload-php/

    this.configServ.show();
    console.log(this.post_uploadImgData);
    this.configServ.postFormData('/profileimgupload.php', this.post_uploadImgData).then((res:any) => {  // console.log(res);
      console.log(res);
      this.configServ.hide();
      if(res.status === 'success'){
        this.isPhotoUpdated = true;
           this.eventServ.publish(res.user);
           this.checkStr.setStore('user_dataMW', res.user);
           this.dismiss();
           this.presentToast(res.message);
      }else{
        this.isPhotoUpdated = false;
        this.presentToast(res.message);
      }
    }).catch( err => {
      this.isPhotoUpdated = false;
    });
  }





  dismiss() {
    this.modalCtrl.dismiss(this.isPhotoUpdated);
    //  this.modalCtrl.dismiss({'dismissed': true});
  } 





  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      mode: "md"
    });
    toast.present();
  }


  photoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageData);
  }


  ngOnInit() {
    // this.sanitizer.bypassSecurityTrustUrl(this.imageData);
    // console.log(`${this.imageData}`)
    // async closeModel() {
    //   const close: string = "Modal Removed";
    //   await this.modalCtrl.dismiss(close);
    }

}
