import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { FilterPage } from '../../../modals/filter/filter.page';
import { SortPage } from '../../../modals/sort/sort.page';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-sign-series',
  templateUrl: './sign-series.page.html',
  styleUrls: ['./sign-series.page.scss'],
})
export class SignSeriesPage implements OnInit {

  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;


    signSeries_Data: any;
      numOfData: number = 20;

  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2, private platform: Platform) { }



  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.get_signSeries_Data();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.get_signSeries_Data();
    }, 2000);
  }

  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      event.target.complete(); 
    }, 2000); 
  }



  onScroll(event) {
  if(this.platform.is('android')){
    if (event.detail.scrollTop >= 5) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'fixed');
      this.renderer.setStyle(this.toolbar['el'], 'top', '0px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'relative');
    }
  }
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



  




  get_signSeries_Data(){
    this.configServ.getData('/signatureseries.php').then((res:any) => {   console.log(res);
      if(res.status === 'success'){
        this.signSeries_Data = res.prod_details;
      }
    }).catch( err => {
    });
  }



  goto_sign_seriesProduct(sr_id){
     console.log(sr_id)
     this.router.navigate(['/sign-series-details'],{ queryParams : {"sr_id": sr_id} });
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
