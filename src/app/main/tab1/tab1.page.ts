import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonContent, IonToolbar, IonSlides} from '@ionic/angular';

import { NavController, IonRouterOutlet, Platform, ToastController, AlertController, MenuController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';
import { EventService } from '../../services/event.service';

import { App } from '@capacitor/app';


// debugger
// <div tappable (click)="doClick()">I am clickable!</div>

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean = false;
  userData: any;
    user_id: any;
    user_email: any
    user_img: any;

  isCartData: boolean;
  userCartData: any;

      userCart_Details: any;


    bannerOpts = {
      freeMode: true,
      slidePerView: 1,
      spaceBetween: 10,
      pager: true,
      loop: true
    }


    add_wishData:  any;
    rm_wishData: any;

  value_segmentChanged = 0;
  bannerImages_Data: any;

  newlyAdded_Data: any;
    featuredGames_Data: any;
  signatureSeries_Data: any;
    recentPriceChange_Data: any;
  recentlySold_Data: any;


  skeletonDummy = [{'id' : '1'}, {'id' : '2'}, {'id' : '3'}, {'id' : '4'}, {'id' : '5'}];

  slideOpts = {
    zoom: false,
    initialSlide: 1,  
    speed: 600,  
    autoplay: {
      delay: 3000,
    },
    loop: false,
  };


  constructor(private router: Router, public modalCtrl: ModalController, public toastController: ToastController, 
              private platform: Platform, private routerOutlet: IonRouterOutlet, public alrtCtrl: AlertController,  
              private navCtrl: NavController,
              public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
              public renderer: Renderer2, private menu: MenuController, public eventServ: EventService,)

            {  
              this.eventPublish() 
              this.eventPublishCart()

  
              this.platform.backButton.subscribeWithPriority(-1, (res) => {
                if (!this.routerOutlet.canGoBack()) {
                  App.exitApp();
                }
              })
              // App.addListener('backButton', ({canGoBack}) => {
              //   console.log(canGoBack)
              //   if(!canGoBack){
              //     App.exitApp();
              //   } else {
              //     window.history.back();
              //   }
              // });
            }


  ionViewWillEnter(){
    this.value_segmentChanged = 0;
    this.checkLogin();

    setTimeout(() => {
      this.call_all_functions();
    }, 400);
  }




  doRefresh(event) {
    this.checkLogin();
    setTimeout(() => {
      this.get_BannerImages_Data();
      this.get_NewlyAdded_Data();
      this.get_FeaturedGames_Data();
      this.get_SignatureSeries_Data();
      this.get_RecentPriceChange_Data(); 
      this.get_RecentlySold_Data();
      event.target.complete();
    }, 2000);
  }

  



  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      console.log('Tab1   '+data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
        if(this.userData.email){
          this.isLoggedIn = true;
          this.user_id = this.userData.userid;
          this.user_img = this.userData.user_img;
          this.checkMyCart();
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    },(reason) => {
        this.isLoggedIn = false;
    }
    ).catch( err => {
        this.isLoggedIn = false;
    });
  }





  checkMyCart(){
    this.checkStr.getStore('user_myCart').then((res:any) => { 
      console.log('Tab1_cart   '+res);
      if(res != null || res != '' || typeof(res) != 'undefined'){
        if(res.orderid  && res.prodid  && res.prodtype){
          this.userCartData = res;
          this.isCartData = true;
        }else{ this.isCartData = false; }
      }else{ this.isCartData = false; }
    },(reason) =>{
         this.isCartData = false;
    }).catch( err => {
         this.isCartData = false;
    });
  }




//   // subscribe to event 
eventPublish(){
  this.eventServ.currentEvent.subscribe((data: any) => {
    console.log('Tab1_event   '+data);
    if(data.userid){
      this.userData = data;
        this.isLoggedIn = true;
        this.user_img = this.userData.user_img;
    }else{ }
    //  console.log('user#:   '+ this.user_role +'   '+ this.isLoggedIn);    
  }); 
}


//   // subscribe to event  cart
eventPublishCart(){
  this.eventServ.cart_currentEvent.subscribe((res: any) => {
    console.log('Tab1_event_cart   '+res);
    if(res != null || res != '' || typeof(res) != 'undefined'){
      if(res.orderid  && res.prodid  && res.prodtype){
        this.userCartData = res;
        this.isCartData = true;
      }else{ this.isCartData = false; }
    }else{ this.isCartData = false; }
  }); 
}




async call_all_functions(){
  console.log('userid:  '+this.user_id);
  if(this.user_id === undefined){

  }else{

  }
  // this.menu.enable(true, 'seller');
  // this.menu.enable(true, 'seller');
  // this.menu.enable(true, 'seller');


  this.get_BannerImages_Data();
  this.get_NewlyAdded_Data();
  this.get_FeaturedGames_Data();
  this.get_SignatureSeries_Data();
  this.get_RecentPriceChange_Data(); 
  this.get_RecentlySold_Data();
}

  segmentChanged(ev: any) { 
    console.log('Segment changed', this.value_segmentChanged);
    // if(this.value_segmentChanged == 'newly_added'){
    //    this.router.navigate(['newly-added']);
    // }else if(this.value_segmentChanged == 'featured_games'){
    //    this.router.navigate(['featured-games']);
    // }else if(this.value_segmentChanged == 'recent_price_change'){
    //    this.router.navigate(['recent-price-change']);
    // }else{
    //   this.value_segmentChanged = 'all';
    // }
  }  


  segmentClick(val){
    // console.log('Segment cliked', val);
    // var titleELe = document.getElementById(val);
    // console.log(titleELe.offsetTop);
    // this.content.scrollByPoint(0, titleELe.offsetTop, 1000);


    if(val == 'all'){
      this.content.scrollToTop(200);
      // this.router.navigate(['maintabs/tabs/tab1']);
    }else if(val == 'newly_added'){
       this.router.navigate(['newly-added']);
    }else if(val == 'featured_games'){
       this.router.navigate(['featured-games']);
    }else if(val == 'recent_price_change'){
       this.router.navigate(['recent-price-change']);
    }else{
      console.log('else')
    }
  }

  // async segmentChanged() { 
  //   console.log('Segment changed', this.value_segmentChanged);
  //   // if(this.value_segmentChanged == 'newly_added'){
  //   //    this.router.navigate(['newly-added']);
  //   // }else if(this.value_segmentChanged == 'featured_games'){
  //   //    this.router.navigate(['featured-games']);
  //   // }else if(this.value_segmentChanged == 'recent_price_change'){
  //   //    this.router.navigate(['recent-price-change']);
  //   // }else{
  //   //   this.value_segmentChanged = 'all';
  //   // }
  // } 



  seeAll_click(c_val){
    if(c_val == 'newly_added'){
       this.router.navigate(['newly-added']);
    }else if(c_val == 'featured_games'){
       this.router.navigate(['featured-games']);
    }
    else if(c_val == 'upcoming_signature_series'){
       this.router.navigate(['sign-series']);
    }
    else if(c_val == 'recent_price_change'){
       this.router.navigate(['recent-price-change']);
    }
    else if(c_val == 'recently_sold'){
       this.router.navigate(['recently-sold']);
    }
  }



  
  goto_productDetails(prod_id, type){
     console.log('Go to Product detail page  ' + prod_id+ type);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": type} });
  }


  goto_searchModal(){
    this.navCtrl.navigateForward(['search-bar']);
  }


  goto_sign_seriesProduct(sr_id){
    console.log(sr_id)
    this.router.navigate(['/sign-series-details'],{ queryParams : {"sr_id": sr_id} });
  }




// apis functions
async get_BannerImages_Data(){
  this.configServ.getData('/banner.php').then((res:any) => { //  console.log(res);
    // console.log(res);
    if(res.status === 'success'){
      this.bannerImages_Data = res.Banner_image;
    }else{
      this.bannerImages_Data = null;
    }
  }).catch( err => {
  });
}




async get_NewlyAdded_Data(){
  this.configServ.postData('/newlyadded.php', {"userid": this.user_id}).then((res:any) => {  console.log(res);
    if(res.status === 'success'){
      this.newlyAdded_Data = res.prod_details;
    }else{
      this.newlyAdded_Data = null;
    }
  }).catch( err => {
  });
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


async get_SignatureSeries_Data(){
  this.configServ.getData('/signatureseries.php').then((res:any) => {  // console.log(res);
    if(res.status === 'success'){
      this.signatureSeries_Data = res.prod_details;
    }else{
      this.signatureSeries_Data = null;
    }
  }).catch( err => {
  });
}


async get_RecentPriceChange_Data(){
  this.configServ.getData('/recentpricechange.php').then((res:any) => {  console.log(res);
    if(res.status === 'success'){
      this.recentPriceChange_Data = res.prod_details;
    }else{
      this.recentPriceChange_Data = null;
    }
  }).catch( err => {
  });
}


async get_RecentlySold_Data(){
  this.configServ.postData('/recentlysold.php', {"userid": this.user_id}).then((res:any) => { console.log(res);
    if(res.status === 'success'){
      this.recentlySold_Data = res.prod_details;
    }else{
      this.recentlySold_Data = null;
    }
  }).catch( err => {
  });
}




async addto_wishlists(add_prdid){
  this.add_wishData = {"userid": this.user_id, "prodid": add_prdid};
  console.log(this.add_wishData);
  this.configServ.postData('/addtowishlist.php', this.add_wishData).then((res:any) => { // console.log(res);
    if(res.status === 'success'){
      this.get_NewlyAdded_Data();
      this.get_FeaturedGames_Data();
      this.get_RecentlySold_Data();
    }else{
        this.presentToast(res.message);
    }
  }).catch( err => {
  });
}



async rmto_wishlists(rm_prdid){
  this.rm_wishData = {"userid": this.user_id, "prodid": rm_prdid};
  console.log(this.rm_wishData);
  this.configServ.postData('/removewishlist.php', this.rm_wishData).then((res:any) => { // console.log(res);
    if(res.status === 'success'){
      this.get_NewlyAdded_Data();
      this.get_FeaturedGames_Data();
      this.get_RecentlySold_Data();
    }else{
        this.presentToast(res.message);
    }
  }).catch( err => {
  });
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


  // ionViewDidLeave(){
  //   this.value_segmentChanged = 'all';
  //   this.checkLogin();
  // }


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
