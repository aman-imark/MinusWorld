import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';
import { EventService } from '../../../services/event.service';

import { ToastController, IonContent, Platform } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @ViewChild("header") header: HTMLElement;
  @ViewChild(IonContent) content: IonContent;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    ProductData: any;
    ProductData_thumb: any;
    Product_relatedData: any;

    add_wishData: any;
    rm_wishData: any;

    setCartData: any;



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

    product_type: string;

    constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router,  
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2, private navCtrl: NavController, public eventServ: EventService, private platform: Platform) { }



    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.product_type = res.type;    
        // recently_sold, featured_games, newly_added, search_product, seller_product, releted_product, gameforsale
        this.get_ProductsDetails(res.product_id);
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



    get_ProductsDetails(prod_id){
      this.configServ.postData('/proddetails.php', {"prodid": prod_id}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.content.scrollToTop(500);
          this.ProductData = res.ProductDetails;
          this.ProductData_thumb = res.ProductDetails.thumbnail_img;
          this.Product_relatedData= res.RelatedProducts;
        }
      }).catch( err => {
      });
    }
  


    buyProduct_Clicked(prod_id, prod_type){
      console.log(this.user_id)
      console.log(prod_id)
      console.log(prod_type)


      if(this.user_id != null && this.user_id != undefined){
         if(prod_id != null && prod_id != undefined){
           if(prod_type != null && prod_type != undefined){
            this.configServ.postData('/buynow.php', {"userid": this.user_id, "prodid": prod_id, "prodtype": prod_type}).then((res:any) => {  console.log(res);
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
              console.log(err)
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
    


    
    async addto_wishlists(add_prdid){
      this.add_wishData = {"userid": this.user_id, "prodid": add_prdid};
      console.log(this.add_wishData);
      this.configServ.postData('/addtowishlist.php', this.add_wishData).then((res:any) => {  console.log(res);
        if(res.status === 'success'){
          this.get_ProductsDetails(res.product_id);
        }else{
            this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }
    



    async rmto_wishlists(rm_prdid){
      this.rm_wishData = {"userid": this.user_id, "prodid": rm_prdid};
      console.log(this.rm_wishData);
      this.configServ.postData('/removewishlist.php', this.rm_wishData).then((res:any) => {  console.log(res);
        if(res.status === 'success'){
          this.get_ProductsDetails(res.product_id);
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }
    

    goto_productDetails(prod_id){
       this.configServ.show();
       setTimeout( () => {
        this.configServ.hide();
       }, 500)
       console.log('Go to Product detail page  ' + prod_id);
       this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": "releted_product"} });
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
