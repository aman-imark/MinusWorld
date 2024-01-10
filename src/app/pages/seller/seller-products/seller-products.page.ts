import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";


@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.page.html',
  styleUrls: ['./seller-products.page.scss'],
})
export class SellerProductsPage implements OnInit {
  
  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    RecentSales_Data: any;
    Delivered_Data: any;
    Cancelled_Data: any;


  value_segmentChanged = 'your_products';

  YourProduct_Data: any;
  Draft_Data: any;
  Sold_Data: any;



  button_status = 'active';

  constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, public element: ElementRef, 
              public renderer: Renderer2, private platform: Platform) { }



              
  ionViewWillEnter(){
    this.checkLogin();
  }



  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      console.log(data);
      if(data != null || data != '' || typeof(data) != 'undefined'){
      this.userData = data;
        if(this.userData.email){
           this.isLoggedIn = true;
           this.user_id = this.userData.userid;
           this.get_Seller_Products_Data(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }




  
  async segmentChanged(ev: any) { 
    // console.log('Segment changed', this.value_segmentChanged); 
  } 



  get_Seller_Products_Data(uid){
    this.configServ.postData('/viewproduct.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.YourProduct_Data = res.YourProduct.product_details;
        this.Draft_Data = res.Draft.product_details;
        this.Sold_Data = res.Sold.product_details;
      }else{
      }
    }).catch( err => {
    });
    // {
    //   "status": "success",
    //   "YourProduct": {
    //       "message": "Your Products",
    //       "product_details": [
    //           {
    //               "prodid": "1123",
    //               "thumbnailimage": "http://evolvethought.com/minusworlds/images/no-image1.jpg",
    //               "prodname": "Test Boneless",
    //               "prodtyp": "Consoles",
    //               "prodprice": 2222,
    //               "status": "Active"
    //           }
    //       ]
    //   },
    //   "Draft": {
    //       "message": "Draft Products",
    //       "product_details": [
    //           {
    //               "prodid": "1122",
    //               "thumbnailimage": "http://evolvethought.com/minusworlds/uploads/62849857b2a40.",
    //               "prodname": "0000000007",
    //               "prodtyp": "Consoles",
    //               "prodprice": 2222,
    //               "status": "Save"
    //           }
    //       ]
    //   },
    //   "Sold": {
    //       "message": "No Results Found",
    //       "product_details": []
    //   }
    // }
  }







  active_productClick(prod_id){
    // do product Inactive
    console.log('Now product is Active' + prod_id);
    this.configServ.postData('/activeinactiveproduct.php', {"prodid": prod_id, "action": "inactive"}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.checkLogin();
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }

  inactive_productClick(prod_id){
    // do product Active
    console.log('Now product is Inactive' + prod_id);
    console.log('Now product is Active' + prod_id);
    this.configServ.postData('/activeinactiveproduct.php', {"prodid": prod_id, "action": "active"}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.checkLogin();
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }



  goto_productDetails(prod_id){
    console.log('Go to Product detail page  ' + prod_id);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": 'seller_product'} });
  }

  update_productClick(prod_id){
    console.log('Product Edit' + prod_id);
     this.router.navigate(['/product-update'],{ queryParams : {"product_id": prod_id} });
  }

  async delete_Confirmation(prod_id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure want to Delete this Product?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => { }
        }, {
          text: 'Delete',
          id: 'confirm-button',
          handler: () => {
            this.delete_product(prod_id);
          }
        }
      ]
    });
    await alert.present();
  }




  delete_product(del_prod_id){
    console.log('Delete' + del_prod_id);
    this.configServ.postData('/deleteproduct.php', {"prodid": del_prod_id}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.checkLogin();
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
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
