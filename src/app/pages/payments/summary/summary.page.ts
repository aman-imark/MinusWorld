import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    userCart_Data: any;
    activeStepper = true;
    on_addressBar: boolean;
    on_paymentsBar: boolean;
    on_summaryBar: boolean;


      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, 
              public renderer: Renderer2, public modalCtrl: ModalController) { }

  
              


    ionViewWillEnter(){
      this.checkLogin();
      // this.activatedRoute.queryParams.subscribe((res)=>{
      //   console.log(res.order_id)
      //   this.get_order_id = res.order_id;
      //   this.userMy_Cart_Data(res.order_id);
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
            //  this.getUserAdddress_Data(this.user_id);
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }


  

    // getUserPayments_Data(userid){
    //   this.configServ.postData('/deliveryaddress.php', {"userid": userid}).then((res:any) => {  // console.log(res);
    //     console.log(res);
    //     if(res.status === 'success'){
    //     }else{
    //       this.presentToast(res.message);
    //     }
    //   }).catch( err => {
    //   });
    // }




  user_goto_FinalPayments(){
     // this.router.navigate(['/pay-method'],{ queryParams : {} });
     // this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": 'search'} });
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
