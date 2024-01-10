import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    isCartData: boolean;
    userCartData: any;
      userCart_Details: any;
      get_order_id: any;
      get_prod_id:  any;
      get_prod_type: any;


    deliveryAddress_Data: any;
    stateTax: any;
      

      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2) { }

  
              


    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
    

      this.activatedRoute.queryParamMap.subscribe((res)=>{
        console.log(res)
        console.log(JSON.parse(res['params']['delivery_Address']))
        this.deliveryAddress_Data = JSON.parse(res['params']['delivery_Address']);
        this.getState_tax(this.deliveryAddress_Data.ship_stateid);
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
             this.checkMyCart();
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }
  
  


    async checkMyCart(){
      this.checkStr.getStore('user_myCart').then((res:any) => { 
        this.userCartData = res;
        if(this.userCartData != null && this.userCartData != undefined){
          if(this.userCartData.orderid != null && this.userCartData.orderid != undefined  && this.userCartData.orderid != ''){
            this.get_order_id = this.userCartData.orderid;
            this.get_prod_id = this.userCartData.prodid;
            this.get_prod_type = this.userCartData.prodtype;
            this.get_userMy_Cart_Data(this.userCartData.orderid, this.userCartData.prodtype);
            this.isCartData = true;
          }else{
            this.isCartData = false;
            // this.presentToast('Cart Storage Not Found1!');
          }
        }else{
           this.isCartData = false;
          //  this.presentToast('Cart Storage Not Found!');
        }
      }).catch( err => {
         console.log(err);
      });
    }



    get_userMy_Cart_Data(orderid, ordertype){
      this.configServ.postData('/mycart.php', {"userid": this.user_id, "orderid": orderid, "ordertype": ordertype}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.userCart_Details = res.MyCartDetails[0];
          if(this.userCart_Details.length >= 1){
            this.isCartData = true;
          }else{
            this.isCartData = false;
          }
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }


    getState_tax(stateID){
      this.configServ.postData('/tax.php', {"stateid": stateID}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
               this.stateTax = res.tax;
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }





    goto_OrderPayment(){
      this.router.navigate(['/pay-method'],{ queryParams : {} });
      // this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": 'search'} });
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
