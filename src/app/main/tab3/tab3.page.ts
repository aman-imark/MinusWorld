import { Component, Input, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';


import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { FilterPage } from '../../modals/filter/filter.page';
import { SortPage } from '../../modals/sort/sort.page';


import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() src:string;
  @Input() default:string;

  isLoggedIn: boolean;
  userData: any;
    user_id: any;
    user_email: any
    user_img: any;

  isCartData: boolean;
  userCartData: any;
      userCart_Details: any;
      get_order_id: any;
      get_prod_id:  any;
      get_prod_type: any;


  gameForSale_Data: any; 
   numOfData: number = 20;


   sort_filter: any = {
      start : "",
      end : "",
      userid : "",
      video_game_typ : "",
      console : "",
      grade : "",
      seal_grade : "",
      box_grade: "",
      min_vga : "",
      max_vga : "",
      variant : "",
      min_price : "",
      max_price : "",
      accepting_offers : "",
      game_developer : "",
      sort : ""
  };




  constructor(public toastController: ToastController, public configServ: ConfigService, public checkStr: SessionService,
       public element: ElementRef, public renderer: Renderer2, private router: Router, public modalCtrl: ModalController,
       private platform: Platform) 

  { 
    // this.addMoreItems();  
  }

  ionViewWillLeave(){
    this.checkStr.removeStore('marketPlaceFilter');
    this.checkStr.removeStore('marketPlaceSort');
  }

  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.sort_filter['video_game_typ'] = '';
    this.sort_filter['console'] = '';
    this.sort_filter['grade'] = '';
    this.sort_filter['seal_grade'] = '';
    this.sort_filter['box_grade'] = '';
    this.sort_filter['min_vga'] = '';
    this.sort_filter['max_vga'] = '';
    this.sort_filter['variant'] = '';
    this.sort_filter['min_price'] = '';
    this.sort_filter['max_price'] = '';
    this.sort_filter['game_developer'] = '';
    this.sort_filter['sort'] = '';
    this.getGameForSale_Data(this.sort_filter);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.sort_filter['video_game_typ'] = '';
      this.sort_filter['console'] = '';
      this.sort_filter['grade'] = '';
      this.sort_filter['seal_grade'] = '';
      this.sort_filter['box_grade'] = '';
      this.sort_filter['min_vga'] = '';
      this.sort_filter['max_vga'] = '';
      this.sort_filter['variant'] = '';
      this.sort_filter['min_price'] = '';
      this.sort_filter['max_price'] = '';
      this.sort_filter['game_developer'] = '';
      this.sort_filter['sort'] = '';
      console.log(this.sort_filter)
      this.getGameForSale_Data(this.sort_filter);
      event.target.complete();
    }, 2000);
  }



  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      // console.log(data);

      if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
        if(this.userData.email){
          this.isLoggedIn = true;
          this.user_id = this.userData.userid;
          this.user_img = this.userData.user_img;

        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    },(reason) => {
        this.isLoggedIn = false;
    }
    ).catch( err => {
        this.isLoggedIn = false;
    });
  }

  
  

  onScroll(event) {
  if(this.platform.is('android')){
    if(this.gameForSale_Data){
    if (event.detail.scrollTop >= 5 && event.detail.scrollTop >= event.detail.startY) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'fixed');
      this.renderer.setStyle(this.toolbar['el'], 'top', '0px');
      // this.renderer.setStyle(this.toolbar['el'], 'padding', '4px 0px');
    } else{
      this.renderer.setStyle(this.header['el'], 'top', '0px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'relative');
      // this.renderer.setStyle(this.toolbar['el'], 'padding', '4px 0px');
    }
    }
  }
  }



  async sortClick(){
    const modal = await this.modalCtrl.create({
      component: SortPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss: true,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 0.7]
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        // console.log(typeof data.data)
        if(data.data !== undefined){
        if(data.data.sort && data.data.clear === false){
          if(data.data.sort == 'relevance'){ console.log(data.data.sort);
          }else if(data.data.sort == 'net_price ASC' || data.data.sort == 'net_price DESC' || 
                   data.data.sort == 'Recently Added' || data.data.sort == 'Recent Price Change'){
              this.sort_filter['userid'] = this.user_id;
              this.sort_filter['sort'] = data.data.sort;
              console.log(this.sort_filter);
              this.configServ.show();  
              this.getGameForSale_Data(this.sort_filter);
                setTimeout(() => {
                  this.configServ.hide();          
                }, 2000);
          }
        }
        }
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
      initialBreakpoint: 1,
      breakpoints: [0, 1]
      });
      
      modal.onDidDismiss().then((data) => {
        console.log(data);
        // console.log(data.data);
        if(data.data.filter && data.data.clear === false && data.data.apply === true){

          this.sort_filter['min_vga'] = data.data.filter.vga_range.min;
          this.sort_filter['max_vga'] = data.data.filter.vga_range.max;
          this.sort_filter['min_price'] = data.data.filter.prc_range.min;
          this.sort_filter['max_price'] = data.data.filter.prc_range.max;


          //  if(data.data.filter.vga_range.min == '10'){
          //     this.sort_filter['min_vga'] = "";
          //  }else{
          //     this.sort_filter['min_vga'] = data.data.filter.vga_range.min;
          //  }
           
          //    if(data.data.filter.vga_range.max == '100'){
          //       this.sort_filter['max_vga'] = "";
          //    }else{
          //       this.sort_filter['max_vga'] = data.data.filter.vga_range.max;
          //    }

          //  if(data.data.filter.prc_range.min == '10'){
          //     this.sort_filter['min_price'] = "";
          //  }else{
          //     this.sort_filter['min_price'] = data.data.filter.prc_range.min;
          //  }

          //    if(data.data.filter.prc_range.max == '20000'){
          //       this.sort_filter['max_price'] = "";
          //    }else{
          //       this.sort_filter['max_price'] = data.data.filter.prc_range.max;
          //    }


          if(data.data.filter.video_game_typ || data.data.filter.console || data.data.filter.grade || data.data.filter.seal_grade
            || data.data.filter.box_grade || data.data.filter.variant || data.data.filter.game_developer || this.sort_filter['min_vga']
            || this.sort_filter['max_vga'] || this.sort_filter['min_price'] || this.sort_filter['max_price']){
                 this.sort_filter['userid'] = this.user_id;
                 this.sort_filter['video_game_typ'] = data.data.filter.video_game_typ;
                 this.sort_filter['console'] = data.data.filter.console;
                 this.sort_filter['grade'] = data.data.filter.grade;
                 this.sort_filter['seal_grade'] = data.data.filter.seal_grade;
                 this.sort_filter['box_grade'] = data.data.filter.box_grade;
                 this.sort_filter['variant'] = data.data.filter.variant;
              console.log(this.sort_filter);
              this.configServ.show();  
              this.getGameForSale_Data(this.sort_filter);
                setTimeout(() => {
                  this.configServ.hide();          
              }, 2000);
          }
        }
      });
      return await modal.present();
  }




 getGameForSale_Data(sort_filter_data){
   console.log(sort_filter_data);
    this.configServ.postData('/gamesforsale.php', sort_filter_data).then((res:any) => { // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.gameForSale_Data = res.prod_details;
      }else{
        this.presentToast(res.message)
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
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": "gameforsale"} });
  }


  
  go_to_notifications(){
    this.router.navigate(['/notifications']);
    // this.navCtrl.navigateRoot('/notifications');
  }
  
  go_to_cart(){
    this.router.navigate(['/mycart']);
    // this.navCtrl.navigateRoot('/mycart');
  }
  
  go_to_profile(){
    this.router.navigate(['/maintabs/tabs/tab5']);
    // this.navCtrl.navigateRoot('/maintabs/tabs/tab5');
  }
  
  go_to_login(){
    this.router.navigate(['/login']);
    // this.navCtrl.navigateRoot('/login');
  }





  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      mode: "md"
    });
    toast.present();
  }


  ngOnInit(): void {

  }
}
