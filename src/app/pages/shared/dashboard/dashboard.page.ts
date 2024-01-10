import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { Location } from "@angular/common";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;
    
    active_pBar = false;

    no_data = true;


  value_segmentChanged = 'recent_sales';

   by_total_sales: any;
   by_pending_deliveries: any;
   by_awaiting_confirmation: any;
   by_total_order: any;
   by_monthData: any;
   by_recent_sales: any;
   by_delivered: any;

     sl_total_sales: number;
     sl_pending_deliveries: any;
     sl_awaiting_confirmation: any;
     sl_total_order: any;
     sl_monthData: any;
     sl_recent_sales: any;
     sl_delivered: any;



  constructor(public alertController: AlertController, private router: Router, public toastCtrl: ToastController, 
              public configServ: ConfigService, public checkStr: SessionService, private location: Location,  
              public modalCtrl: ModalController, public element: ElementRef, 
              public renderer: Renderer2, private platform: Platform) 
              
              { }


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
           this.user_role = this.userData.user_type;
           if(this.userData.user_type === '1'){
                // user is Buyer
                this.getBuyerDashboard_Data(this.user_id);
                console.log('user is Buyer');
                this.no_data = false;
           }else if(this.userData.user_type === '2'){
                // user is Seller
                this.getSellerDashboard_Data(this.user_id);
                console.log('user is Seller');
                this.no_data = false;
           }
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }






  getBuyerDashboard_Data(uid){
    this.configServ.postData('/buyerdashboard.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.by_total_sales = res.total_sales;
        this.by_pending_deliveries = res.pendingdeliveries;
        this.by_awaiting_confirmation = res.awaiting_confirmation;
        this.by_total_order = res.totalorder;
        this.by_monthData = res.monthData;
        this.by_recent_sales = res.RecentOrders.recent_Orders_details;
        this.by_delivered = res.delivered.Products;
      }
    }).catch( err => {
    });
  }


  getSellerDashboard_Data(uid){
    this.configServ.postData('/sellerdashboard.php', {"userid": uid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.sl_total_sales = res.total_sales;
        this.sl_pending_deliveries = res.pendingdeliveries;
        this.sl_awaiting_confirmation = res.awaiting_confirmation;
        this.sl_total_order = res.total_order;
        this.sl_monthData = res.monthData;
        this.sl_recent_sales = res.recent_sales.recent_sales_details;
        this.sl_delivered = res.delivered.Products ;
      }
    }).catch( err => {
    });
  }



  
  filterDashboardData_Buyer(val){
    console.log(val);
    this.configServ.show();
   this.configServ.postData('/filtersellerdashboard.php', {"userid": this.user_id, "filter": val}).then((res:any) => {  // console.log(res);
     console.log(res);
     this.configServ.hide();
     if(res.status === 'success'){
      this.by_total_sales = res.total_sales;
      this.by_pending_deliveries = res.pendingdeliveries;
      this.by_awaiting_confirmation = res.awaiting_confirmation;
      this.by_total_order = res.totalorder;
      this.by_monthData = res.monthData;
      this.by_recent_sales = res.RecentOrders.recent_Orders_details;
      this.by_delivered = res.delivered.Products;
     }
   }).catch( err => {
   });
  }



 filterDashboardData_Seller(val){
   console.log(val);
   this.configServ.show();
  this.configServ.postData('/filtersellerdashboard.php', {"userid": this.user_id, "filter": val}).then((res:any) => {  // console.log(res);
    console.log(res);
    this.configServ.hide();
    if(res.status === 'success'){
      this.sl_total_sales = res.total_sales;
      this.sl_pending_deliveries = res.pendingdeliveries;
      this.sl_awaiting_confirmation = res.awaiting_confirmation;
      this.sl_total_order = res.total_order;
      this.sl_monthData = res.monthData;
      this.sl_recent_sales = res.recent_sales.recent_sales_details;
      this.sl_delivered = res.delivered.Products ;
    }
  }).catch( err => {
  });
 }




  async segmentChanged(ev: any) { 
    // console.log('Segment changed', ev); 
    console.log('Segment changed', this.value_segmentChanged); 
  } 
  
  add_product_Clicked(){
    this.router.navigate(['/product-add']);
  }


  ngOnInit() {
  }

}
