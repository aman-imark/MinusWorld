import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { IonContent, ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';

import { CountryListPage } from '../../../modals/country-list/country-list.page';
import { StateListPage } from '../../../modals/state-list/state-list.page';



@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

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

     

    activeStepper = true;
    on_addressBar: boolean;
    on_paymentsBar: boolean;
    on_summaryBar: boolean;


    addressView: boolean = false;
    validation: boolean = false;
    userAddress_Data: any;
    userShippingAddrs_Data: any;
    userBillingAddrs_Data: any;


    usd_firstname: any;
    usd_lastname: any;
     usd_address: any;
     usd_apartment: any;
     usd_city: any;
     usd_state: any;
     usd_stateid: any;
     usd_country: any;
     usd_countryid: any;
     usd_zip: any;
     usd_phone: any;

    ubd_firstname: any;
    ubd_lastname: any;
     ubd_address: any;
     ubd_apartment: any;
     ubd_city: any;
     ubd_state: any;
     ubd_stateid: any;
     ubd_country: any;
     ubd_countryid: any;
     ubd_zip: any;
     ubd_phone: any;


    isSameAddress: boolean;

    updAddr: Object = {
      userid : "",
      ship_firstname : "",
      ship_lastname : "",
      ship_address : "",
      ship_apartment : "",
      ship_city : "",
      ship_country : "",
      ship_country_name: "",
      ship_state : "",
      ship_state_name : "",
      ship_zip : "",
      ship_phn : "",

      bill_firstname : "",
      bill_lastname : "",
      bill_address : "",
      bill_apartment : "",
      bill_city : "",
      bill_country : "",
      bill_country_name: "",
      bill_state : "",
      bill_state_name : "",
      bill_zip : "",
      bill_phn: "",
    }


 
      // spaceRest = "/^[a-zA-Z\s]*$/";
      ubd_state_name: String = '';
      usd_state_name: String = '';



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
             this.on_addressBar = true;
             this.on_paymentsBar = false;
             this.on_summaryBar = false;
             this.isSameAddress = true;

             this.user_id = this.userData.userid;
             this.updAddr['userid'] = this.user_id;
             this.checkMyCart(this.user_id);
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }
  
  


    checkMyCart(userid){
      this.checkStr.getStore('user_myCart').then((res:any) => { 
        this.userCartData = res;
        if(this.userCartData != null && this.userCartData != undefined){
          if(this.userCartData.orderid != null && this.userCartData.orderid != undefined  && this.userCartData.orderid != ''){
            this.get_order_id = this.userCartData.orderid;
            this.get_prod_id = this.userCartData.prodid;
            this.get_prod_type = this.userCartData.prodtype;
            this.getUserAdddress_Data(userid, this.get_order_id, this.get_prod_id);
          }else{
            this.presentToast('Cart Storage Not Found1!');
          }
        }else{
          this.presentToast('Cart Storage Not Found!');
        }
      }).catch( err => {
         console.log(err);
      });
    }


  


    getUserAdddress_Data(userid, orderid, prodid){
      this.configServ.postData('/deliveryaddress.php', {"userid": userid, "orderId": orderid, "prodid": prodid}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.userAddress_Data = res;
          this.userShippingAddrs_Data = res.ShippingAddressDetails;
              this.usd_firstname = res.FirstName;
              this.usd_lastname = res.LastName;
              this.usd_address = res.ShippingAddressDetails.Address;
              this.usd_apartment = res.ShippingAddressDetails.Apartment;
              this.usd_city = res.ShippingAddressDetails.City;
              this.usd_state = res.ShippingAddressDetails.StateName;
              this.usd_stateid = res.ShippingAddressDetails.StateId;
              this.usd_country = res.ShippingAddressDetails.Country;
              this.usd_countryid = res.ShippingAddressDetails.CountryId;
              this.usd_zip = res.ShippingAddressDetails.Zip;
              this.usd_phone = res.ShippingAddressDetails.Phone;

          this.ubd_phone = res.ShippingAddressDetails.Phone;
          this.userBillingAddrs_Data = res.BillinAddressDetails;
              this.ubd_firstname = res.FirstName;
              this.ubd_lastname = res.LastName;
              this.ubd_address = res.BillinAddressDetails.Address;
              this.ubd_apartment = res.BillinAddressDetails.Apartment;
              this.ubd_city = res.BillinAddressDetails.City;
              this.ubd_state = res.BillinAddressDetails.StateName;
              this.ubd_stateid = res.BillinAddressDetails.StateId;
              this.ubd_country = res.BillinAddressDetails.Country;
              this.ubd_countryid = res.BillinAddressDetails.CountryId;
              this.ubd_zip = res.BillinAddressDetails.Zip;

              
        }else if(res.status === 'required'){
          this.presentToast(res.message.JSON.stringify());
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }






  check_Address_checkbox_value(value){       
      if(value.detail.checked === true){
         this.isSameAddress = true;
      }else if(value.detail.checked === false){
         this.isSameAddress = false;
      }
  }







  
  async open_addCountryModal_ship(){
    const modal = await this.modalCtrl.create({
      component: CountryListPage,
      initialBreakpoint: 1,
      breakpoints: [0, 0.9, 1],
      backdropDismiss: false,
      componentProps: {
         countryData: this.usd_countryid+'/'+this.usd_country
      }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        if(data.data != undefined){
          this.usd_country = data.data.countryname;
          this.usd_countryid = data.data.countryid; 
          if(this.usd_countryid != '38' && this.usd_countryid != '223'){
            this.usd_state = '';
            this.usd_stateid = '';
          }
        }
        // {"countryid": "9", "countryname": "Antigua and Barbuda"}
      });
      return await modal.present();
  }



  async open_addStateModal_ship(){
    const modal = await this.modalCtrl.create({
      component: StateListPage,
      initialBreakpoint: 1,
      breakpoints: [0, 0.9, 1],
      backdropDismiss:false,
      componentProps: {
        countryid: this.usd_countryid,
        stateData: this.usd_stateid+'/'+this.usd_state,
      }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        if(data.data != undefined){
          this.usd_state = data.data.statename;
          this.usd_stateid = data.data.stateid;
        }
        // {stateid: '5', statename: 'California'}
      });
      return await modal.present();
  }








  async open_addCountryModal_bill(){
    const modal = await this.modalCtrl.create({
      component: CountryListPage,
      initialBreakpoint: 1,
      breakpoints: [0, 0.9, 1],
      backdropDismiss: false,
      componentProps: {
        countryData: this.ubd_countryid+'/'+this.ubd_country
      }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        if(data.data != undefined){
          this.ubd_country = data.data.countryname;
          this.ubd_countryid = data.data.countryid; 
          if(this.ubd_countryid != '38' && this.ubd_countryid != '223'){
            this.ubd_state = '';
            this.ubd_stateid = '';
          }
        }
        // {"countryid": "9", "countryname": "Antigua and Barbuda"}
      });
      return await modal.present();
  }



  async open_addStateModal_bill(){
    const modal = await this.modalCtrl.create({
      component: StateListPage,
      initialBreakpoint: 1,
      breakpoints: [0, 0.9, 1],
      backdropDismiss:false,
      componentProps: {
        countryid: this.ubd_countryid,
        stateData: this.ubd_stateid+'/'+this.ubd_state,
      }
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        if(data.data != undefined){
          this.ubd_state = data.data.statename;
          this.ubd_stateid = data.data.stateid;
        }
        // {stateid: '5', statename: 'California'}
      });
      return await modal.present();
  }




  countChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }

  spaceRest(event) {
    event.target.value = event.target.value.replace(/  +/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }



  user_Address_Update(){
    if(this.isSameAddress  ===  true){
      this.updAddr['ship_firstname'] = this.usd_firstname;
      this.updAddr['ship_lastname'] = this.usd_lastname;
         this.updAddr['ship_address'] = this.usd_address;
         this.updAddr['ship_apartment'] = this.usd_apartment;
         this.updAddr['ship_city'] = this.usd_city;
         this.updAddr['ship_zip'] = this.usd_zip;
         this.updAddr['ship_phn'] = this.usd_phone;
         this.updAddr['ship_country'] = this.usd_countryid;
         this.updAddr['ship_country_name'] = this.usd_country;
          if(this.usd_countryid == '38' || this.usd_countryid == '223'){
              this.updAddr['ship_state'] = this.usd_stateid;
              this.updAddr['ship_state_name'] = this.usd_state;
          }else{
              this.updAddr['ship_state'] = '000';
              this.updAddr['ship_state_name'] = this.usd_state;
          }  


      this.updAddr['bill_firstname'] = this.usd_firstname;
      this.updAddr['bill_lastname'] = this.usd_lastname;
         this.updAddr['bill_address'] = this.usd_address;
         this.updAddr['bill_apartment'] = this.usd_apartment;
         this.updAddr['bill_city'] = this.usd_city;
         this.updAddr['bill_zip'] = this.usd_zip;
         this.updAddr['bill_phn'] = this.usd_phone;
         this.updAddr['bill_country'] = this.usd_countryid;
         this.updAddr['bill_country_name'] = this.usd_country;
          if(this.usd_countryid == '38' || this.usd_countryid == '223'){
              this.updAddr['bill_state'] = this.usd_stateid;
              this.updAddr['bill_state_name'] = this.usd_state;
          }else{
              this.updAddr['bill_state'] = '000';
              this.updAddr['bill_state_name'] = this.usd_state;
          }  

    }else if(this.isSameAddress  ===  false){
      this.updAddr['ship_firstname'] = this.usd_firstname;
      this.updAddr['ship_lastname'] = this.usd_lastname;
         this.updAddr['ship_address'] = this.usd_address;
         this.updAddr['ship_apartment'] = this.usd_apartment;
         this.updAddr['ship_city'] = this.usd_city;
         this.updAddr['ship_zip'] = this.usd_zip;
         this.updAddr['ship_phn'] = this.usd_phone;
         this.updAddr['ship_country'] = this.usd_countryid;
         this.updAddr['ship_country_name'] = this.usd_country;
           if(this.usd_countryid == '38' || this.usd_countryid == '223'){
               this.updAddr['ship_state'] = this.usd_stateid;
               this.updAddr['ship_state_name'] = this.usd_state_name;
           }else{
               this.updAddr['ship_state'] = '000';
               this.updAddr['ship_state_name'] = this.usd_state;
           }  
      this.updAddr['bill_firstname'] = this.ubd_firstname;
      this.updAddr['bill_lastname'] = this.ubd_lastname;
         this.updAddr['bill_address'] = this.ubd_address;
         this.updAddr['bill_apartment'] = this.ubd_apartment;
         this.updAddr['bill_city'] = this.ubd_city;
         this.updAddr['bill_zip'] = this.ubd_zip;
         this.updAddr['bill_phn'] = this.ubd_phone;
         this.updAddr['bill_country'] = this.ubd_countryid;
         this.updAddr['bill_country_name'] = this.ubd_country;
           if(this.ubd_countryid == '38' || this.ubd_countryid == '223'){
               this.updAddr['bill_state'] = this.ubd_stateid;
               this.updAddr['bill_state_name'] = this.ubd_state_name;
           }else{
               this.updAddr['bill_state'] = '000';
               this.updAddr['bill_state_name'] = this.ubd_state;
           }  
    } 

    if(this.updAddr['ship_firstname'] && this.updAddr['ship_address'] && this.updAddr['ship_city'] && this.updAddr['ship_country'] 
       && this.updAddr['ship_state'] && this.updAddr['ship_state_name'] && this.updAddr['ship_zip'] && this.updAddr['bill_firstname'] && this.updAddr['bill_address'] &&
       this.updAddr['bill_city'] && this.updAddr['bill_country'] && this.updAddr['bill_state'] && this.updAddr['bill_state_name'] && this.updAddr['bill_zip']){
        
        console.log('valid one ');
        this.validation = true;
        this.content.scrollToTop(2000);

        if(this.updAddr['ship_firstname'] != ' ' && this.updAddr['ship_address'] != ' ' && this.updAddr['ship_city'] != ' ' && 
           this.updAddr['ship_country'] != ' ' && this.updAddr['ship_state'] != ' ' && this.updAddr['ship_state_name'] != ' ' && this.updAddr['ship_zip'] != ' ' && 
           this.updAddr['bill_firstname'] != ' ' && this.updAddr['bill_address'] != ' ' && this.updAddr['bill_city'] != ' ' && 
           this.updAddr['bill_country'] != ' ' && this.updAddr['bill_state'] != ' ' && this.updAddr['bill_state_name'] != ' ' && this.updAddr['bill_zip']) {
        
            console.log('valid All ');
            // console.table(this.updAddr);
            this.validation = false;
            this.addressView = true;
            // this.router.navigate(['/pay-method'],{ queryParams : {"delivery_Address": JSON.stringify(this.updAddr)} });
       }else{
        console.log('Invalid Two ');
        console.table(this.updAddr);
        this.validation = true;
        this.content.scrollToTop(2000);
       }
    } else{ 
        console.log('Invalid  ');
        console.table(this.updAddr);
        this.validation = true;
        this.content.scrollToTop(2000);
    }
  }





  user_goto_Payments(){
    console.log(this.updAddr);
    this.router.navigate(['/pay-method'],{ queryParams : {"delivery_Address": JSON.stringify(this.updAddr)} });
  }


  editAddress_Enable(){
    this.addressView = false;
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
