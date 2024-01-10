import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';
import { EventService } from '../../../services/event.service';

import { IonContent, ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-mwstore-details',
  templateUrl: './mwstore-details.page.html',
  styleUrls: ['./mwstore-details.page.scss'],
})
export class MwstoreDetailsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild("header") header: HTMLElement;


  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    mwProductData: any;
    mwProductData_thumb: any;
    mwProductData_relatedData: any;

    mw_pid: any;

    setCartData: any;
 
    mwproduct_type: string;

    slideOpts = {
      zoom: false,
      initialSlide: 1,  
      speed: 600,  
      autoplay: {
        delay: 3000,
      },
      loop: false,
      pager: true
    };

      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router,  
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2, private navCtrl: NavController, public eventServ: EventService, private platform: Platform) { }



    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.mwproduct_type = res.type;  // mwstore_product
        this.mw_pid = res.pid;
        this.get_MWstoreProductDetails(res.pid);
       });
     
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
      if (event.detail.scrollTop >= 50) {
        this.renderer.setStyle(this.header['el'], 'top', '-76px');
      } else {
        this.renderer.setStyle(this.header['el'], 'top', '0px');
      }
    }
    }

    
    get_MWstoreProductDetails(pid){
      this.configServ.postData('/mwstore_details.php', {"pid": pid}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
            this.mwProductData = res.ProductDetails;
            this.mwProductData_thumb = res.ProductDetails.thumbnail_img;;
            this.mwProductData_relatedData= res.RelatedProducts; 
        }else{
           this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }



    buyProduct_Clicked(prod_id, prod_type){
      console.log(prod_id, prod_type)
      if(this.user_id != null && this.user_id != undefined){
         if(prod_id != null && prod_id != undefined){
          if(prod_type != null && prod_type != undefined){
            this.configServ.postData('/buynow.php', {"userid": this.user_id, "prodid": prod_id, "prodtype": prod_type}).then((res:any) => {   console.log(res);
              if(res.status === 'success'){
                this.setCartData = {
                  "orderid": res.orderid, 
                  "ordertype":res.ordertype, 
                  "prodid": prod_id, 
                  "prodtype": prod_type
                };
                this.eventServ.publishCart(this.setCartData);
                this.checkStr.setStore('user_myCart', this.setCartData);
                this.navCtrl.navigateForward(['/mycart']);
              }else{
                 this.presentToast(res.message);
              }
            }).catch( err => {
            });
          }else{
             this.presentToast('Product Type is missing!');
          }
         }else{
            this.presentToast('Product Id is not found!');
         }
      }else{
        // this.presentToast('user not found!');
        this.router.navigate(['/login']);
      }
    }



    goto_mwStoreProduct_Details(id, cat){
      console.log(id, cat);
      this.configServ.show();
      setTimeout( () => {
        this.configServ.hide();
      }, 500)
      this.router.navigate(['/mwstore-details'],{ queryParams : {"pid": id, "type": "mwstore_product"} });
      this.content.scrollToTop(1000);
     }



    myBackButton(){
      this.location.back();
    }
  
  
    async presentToast(message) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        mode: "md"
      });
      toast.present();
    }



  ngOnInit() {
  }

}
