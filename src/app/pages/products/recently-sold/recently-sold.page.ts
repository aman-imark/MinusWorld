import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { FilterPage } from '../../../modals/filter/filter.page';
import { SortPage } from '../../../modals/sort/sort.page';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-recently-sold',
  templateUrl: './recently-sold.page.html',
  styleUrls: ['./recently-sold.page.scss'],
})
export class RecentlySoldPage implements OnInit {

  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;


    recentlySold_Data: any;
      numOfData: number = 20;

  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2, private platform: Platform) { }



  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.get_recentlySold_Data();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.get_recentlySold_Data();
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
  



  async sortClick(){
    const modal = await this.modalCtrl.create({
      component: SortPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4, 0.5]
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);

        // {"sort" : "relevance"}
      });
      return await modal.present();
  }


  async filterClick(){
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 0.9]
      });
      
      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        // this.get_modal_Filter_Sort_Data('start', '10');
        // {"filter" : "relevance"}
      });
      return await modal.present();
  }





  // \"start\":\"\",\r\n    \"end\":\"\",\r\n    \"userid\":\"9\",\r\n    \"video_game_typ\":\"\",\r\n    \"console\":\"\",\r\n    \"grade\":\"\",\r\n    \"seal_grade\":\"\",\r\n    \"box_grade\":\"\",\r\n    \"min_vga\":\"\",\r\n    \"max_vga\":\"\",\r\n    \"variant\":\"\",\r\n    \"min_price\":\"\",\r\n    \"max_price\":\"\",\r\n    \"accepting_offers\":\"\",\r\n    \"game_developer\":\"\",\r\n    \"sort\":\"\"\r\n}"

  async get_recentlySold_Data(){
    this.configServ.postData('/recentlysold.php', {"userid": this.user_id}).then((res:any) => {   console.log(res);
      if(res.status === 'success'){
        this.recentlySold_Data = res.prod_details;
      }
    }).catch( err => {
    });
  }



 







  goto_productDetails(prod_id, type){
    console.log('Go to Product detail page  ' + prod_id);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": 'recently_sold'} });
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
