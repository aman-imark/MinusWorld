import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { MwFilterPage } from '../../../modals/mw-filter/mw-filter.page';
import { MwSortPage } from '../../../modals/mw-sort/mw-sort.page';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-featured-games',
  templateUrl: './featured-games.page.html',
  styleUrls: ['./featured-games.page.scss'],
})
export class FeaturedGamesPage implements OnInit {

  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;


    featuredGames_Data : any;
      numOfData: number = 20;

  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2, private platform: Platform) { }



  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.get_FeaturedGames_Data();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.get_FeaturedGames_Data();
    }, 2000);
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


  async get_FeaturedGames_Data(){
    this.configServ.postData('/featuredgames.php', {"userid": this.user_id}).then((res:any) => {   console.log(res);
      if(res.status === 'success'){
        this.featuredGames_Data = res.prod_details;
      }else{
        this.featuredGames_Data = null;
      }
    }).catch( err => {
    });
  }



  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      event.target.complete(); 
    }, 2000); 
  }





  goto_productDetails(prod_id){
    console.log('Go to Product detail page  ' + prod_id);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": "featured_games"} });
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
