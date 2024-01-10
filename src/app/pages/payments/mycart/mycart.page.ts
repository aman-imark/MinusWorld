import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';
import { EventService } from '../../../services/event.service';

import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.page.html',
  styleUrls: ['./mycart.page.scss'],
})
export class MycartPage implements OnInit {

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

    userCart_Details1: any;
      

      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2, public eventServ: EventService) 
              
              {  }

  
              


    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
    
      // this.activatedRoute.queryParams.subscribe((res)=>{
      //   console.log(res.orderid)
      //   this.get_order_id = res.orderid;
      //   // this.userMy_Cart_Data(res.orderid);
      //  });
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
  
  


    checkMyCart(){
      this.checkStr.getStore('user_myCart').then((res:any) => { 
        this.userCartData = res;
        console.log(this.userCartData)
        if(this.userCartData != null && this.userCartData != undefined){
          if(this.userCartData.orderid != null && this.userCartData.orderid != undefined  && this.userCartData.orderid != ''){
            this.get_order_id = this.userCartData.orderid;
            this.get_prod_id = this.userCartData.prodid;
            this.get_prod_type = this.userCartData.prodtype;

            this.get_userMy_Cart_Data(this.userCartData.orderid, this.userCartData.prodtype);
            // if(this.get_prod_type === 'MW'){
            //   this.get_userMy_Cart_Data_Product(this.userCartData.orderid);
            //   this.isCartData = true;
            // }else if(this.get_prod_type === 'MWS'){
            //   this.get_userMy_Cart_Data_MWStore(this.userCartData.orderid);
            //   this.isCartData = true;
            // }else{
            //   this.presentToast('storage product type is not saved!');
            //   this.isCartData = false;
            // }
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
      console.log(orderid)
      this.configServ.postData('/mycart.php', {"userid": this.user_id, "orderid": orderid, "ordertype": ordertype}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.userCart_Details = res.MyCartDetails;
          this.userCart_Details1 = res.MyCartDetails[0];
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





    get_userMy_Cart_Data_MWStore(orderid){
      console.log(orderid)
      this.configServ.postData('/mycart.php', {"userid": this.user_id, "orderid": orderid}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.userCart_Details = res.MyCartDetails;
          this.userCart_Details1 = res.MyCartDetails[0];
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


    get_userMy_Cart_Data_Product(orderid){
      console.log(orderid)
      this.configServ.postData('/mycart.php', {"userid": this.user_id, "orderid": orderid}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.userCart_Details = res.MyCartDetails;
          this.userCart_Details1 = res.MyCartDetails[0];
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



    delete_cartProduct(){
      this.eventServ.publishCart('');
      this.checkStr.removeStore('user_myCart');
      this.checkLogin();
      setTimeout(() => {
        this.presentToast('Now user, Cart is Empty!')
      }, 200);
    }

  


    goto_delivery(){
      this.router.navigate(['/delivery'],{ queryParams : {} });
      // this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id} });
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
