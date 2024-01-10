import { Component } from '@angular/core';


import { SessionService } from '../../services/session.service';
import { EventService } from '../../services/event.service';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  isLoggedIn: boolean;
  userData: any;
    user_id: any;
    user_email: any
    user_img: any;

  isCartData: boolean;
  userCartData: any;

      userCart_Details: any;



    constructor(public checkStr: SessionService, public eventServ: EventService) 
  
  {
    this.checkLogin();
    this.eventPublish() 
    this.eventPublishCart()
  }





  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      // console.log('Tabs   '+data);
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
      // console.log('Tabs_cart   '+res);
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
      // console.log('Tabs_event   '+data);
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
      // console.log('Tabs_event_cart   '+res);
      if(res != null || res != '' || typeof(res) != 'undefined'){
        if(res.orderid  && res.prodid  && res.prodtype){
          this.userCartData = res;
          this.isCartData = true;
        }else{ this.isCartData = false; }
      }else{ this.isCartData = false; }
    }); 
  }



}
