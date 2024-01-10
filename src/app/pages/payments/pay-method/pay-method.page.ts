import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';
import { EventService } from '../../../services/event.service';


import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';
import { Http, HttpResponse, HttpOptions, HttpCookieOptions } from '@capacitor-community/http';
import { Browser } from '@capacitor/browser';

import { MonthYearPage } from '../../../modals/month-year/month-year.page';

import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { DecimalPipe,formatNumber } from '@angular/common';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.page.html',
  styleUrls: ['./pay-method.page.scss'],
})
export class PayMethodPage implements OnInit {

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
      get_order_type: any;
      get_prod_id:  any;
      get_prod_type: any;


    activeStepper = true;
    on_addressBar: boolean;
    on_paymentsBar: boolean;
    on_summaryBar: boolean;
    card_dt_err: boolean = false;

    card1 : any;
    card2: any;
    card3: any;
    card4: any;
    card_number: string;
    card_holder_name;
    card_exp_month;
    card_exp_year;
    through_dateValue;
    split_MM_YYYY: any;
    ccv_value: any;

    

    active_segment: any = '0';  

    dateValue;

    productPrice: number = 0.00;
    shippingFee: number = 0.00;
    taxFee: number = 0.00;
    processingFee: number = 0.00;  // Processing Fee (3%)  = Product Price  + Shipping Fee + Tax
    setPro: number = 3;
    setHun: number = 100;

    orderTotalPrice: number = 0;

    

    stripe_mode: string = 'sandbox';
    stripe_publishablekey: string = 'pk_test_51JXrmkAldTLhvutWmRJldnvuiugtMK38nrCOO2uUwoc9L5tu9CypETEtfnYSsjDtYETigbkXvNs8dCxaHu1C2Hsh00Tmy2z9oW';
    stripe_secretkey: string = 'sk_test_51JXrmkAldTLhvutW1QmDcXIUyt0QOxA0a3p0miygZWz5f58qfy62tVGqu2TfeO5MsCNq0Wa9zznW1gKgG8PcbpoZ00JAED36Zt';
    get_stripeToken: any;


    // PayPalID: string = 'minusworldz@gmail.com';
    PayPalID: string = 'minusworlds15@gmail.com : MinusWorlds15';
    paypal_access_token: string;
    paypal_order_id: string;

    public payPalConfig?: IPayPalConfig;



    deliveryAddress_Data: any;
     get_countryId: string;
     get_countryName: string;
      get_stateId: string;
      get_stateName: string;
     get_zipCode: string;


    payMethod_Data: Object = {
      userid : "",
      stripeToken : "",
      orderid : "",
      prodtype : "",
      ordertype : "",
      ship_address : "",
      ship_apartment : "",
      ship_city : "",
      ship_country : "",
      ship_state : "",
      ship_zip : "",
      bill_address : "",
      bill_apartment : "",
      bill_country : "",
      bill_state : "",
      bill_city : "",
      bill_zip : "",
      phn : ""
  }


  PayPal_Payment_Data: Object = {
    userid : "",
    orderid : "",
    prodtype : "",
    ordertype : "",
    ship_address : "",
    ship_apartment : "",
    ship_city : "",
    ship_country : "",
    ship_state : "",
    ship_zip : "",
    bill_address : "",
    bill_apartment : "",
    bill_country : "",
    bill_state : "",
    bill_city : "",
    bill_zip : "",
    phn : "",
    paypalData : ""
  }


   cardPayForm: FormGroup;
   showSuccess: boolean;

      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, private formb: FormBuilder, private _decimalPipe: DecimalPipe,
              public renderer: Renderer2, public modalCtrl: ModalController, private stripe: Stripe, public eventServ: EventService)

              { }


    ionViewWillEnter(){
      this.activatedRoute.queryParamMap.subscribe((res)=>{  // console.log(res);
        this.deliveryAddress_Data = JSON.parse(res['params']['delivery_Address']);

        this.get_countryId = this.deliveryAddress_Data.ship_country;
        this.get_stateId = this.deliveryAddress_Data.ship_state;
        this.get_zipCode = this.deliveryAddress_Data.ship_zip;
        // this.get_stateName = this.deliveryAddress_Data.ship_state_name;
        // console.log(this.deliveryAddress_Data);
        this.getShipping_tax(this.get_countryId, this.get_zipCode);    
      });

      this.stripe.setPublishableKey(this.stripe_publishablekey).then((res :any) => { console.log(res) 
         },err => {
      }).catch(error => { });

      this.checkLogin();
      this.checkMyCart();
    }





    checkLogin(){
      this.checkStr.getStore('user_dataMW').then((data:any) => {  // console.log(res);
        if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
          if(this.userData.email){
             this.isLoggedIn = true;
             this.on_addressBar = true;
             this.on_paymentsBar = true;
             this.on_summaryBar = false;
             this.user_id = this.userData.userid;
          }else{
             this.isLoggedIn = false;
             this.router.navigate(['/login']);
          }
        }else{
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
      }).catch( err => {   //  console.log(err);
      })
    }






  checkMyCart(){
      this.checkStr.getStore('user_myCart').then((res:any) => {  // console.log(res);
        this.userCartData = res;
        if(this.userCartData != null && this.userCartData != undefined){
          if(this.userCartData.orderid != null && this.userCartData.orderid != undefined  && this.userCartData.orderid != ''){

            this.isCartData = true;
            this.get_order_id = this.userCartData.orderid;
            this.get_prod_id = this.userCartData.prodid;
            this.get_prod_type = this.userCartData.prodtype;
            this.get_order_type = this.userCartData.ordertype;
            
            this.get_userMy_Cart_Data(this.userCartData.orderid, this.userCartData.prodtype);
            this.getState_tax(this.get_countryId, this.get_stateId, this.get_zipCode, this.user_id, this.get_prod_id);
          }else{
            this.presentToast('Cart Storage Not Found1!');
          }
        }else{
          this.presentToast('Cart Storage Not Found!');
        }
      }).catch( err => {
        //  console.log(err);
      });
  }





  get_userMy_Cart_Data(orderid, ordertype){
      this.configServ.postData('/mycart.php', {"userid": this.user_id, "orderid": orderid, "ordertype": ordertype}).then((res:any) => {  // console.log(res);
        // console.log(res);
        if(res.status === 'success'){
          this.userCart_Details = res.MyCartDetails[0];
          this.productPrice = this.userCart_Details.prodprice;
            this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
            this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee; 
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




  getState_tax(countyID, stateID, zipCode, userID, productId){
        this.configServ.show();
        // console.log('countryId:' + countyID, 'stateId:' + stateID, 'zip:' + zipCode, "userid:" + userID, "product_id" + productId);
        this.configServ.postData('/tax.php', {"countryid": countyID, "stateid": stateID, "zip": zipCode, "userid": userID, "product_id": productId}).then((res:any) => { //  console.log(res);
          this.configServ.hide();
          console.log(res);
          if(res.status === 'success'){
             this.taxFee = res.tax;
             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;      
          }else{
             this.presentToast(res.message);
          }      
        }).catch( err => {
          this.configServ.hide();
        });
  }



  // getState_tax(countyID, stateID, zipCode, userID){
  //     this.configServ.show();
  //     //  console.log('countryId:' + countyID, 'stateId:' + stateID, 'zip:' + zipCode, "userid:" + userID);
  //     this.configServ.postData('/tax.php', {"countryid": countyID, "stateid": stateID, "zip": zipCode, "userid": userID}).then((res:any) => {   console.log(res);
  //       this.configServ.hide();
  //       // console.log(res);
  //       if(res.status === 'success'){
  //          this.shippingFee = res.shippingprice;
  //          this.taxFee = res.tax;

  //           if(this.taxFee){
  //             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
  //             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
  //           }else{
  //             this.taxFee = 10;
  //             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
  //             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
  //              // this.presentToast('Tax fee not found!');
  //           }

  //           if(this.shippingFee){
  //             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
  //             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
  //           }else{
  //             this.shippingFee = 10;
  //             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
  //             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
  //             // this.presentToast('Shipping fee not found!');
  //           }
  //       }else{
  //          this.shippingFee = 10;
  //          this.taxFee = 10;
  //          if(this.taxFee && this.shippingFee){
  //             this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
  //             this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
  //          }else{
  //             // this.presentToast('Fee not found!');
  //          }
  //         // this.presentToast(res.message);
  //       }

  //     }).catch( err => {
  //       this.configServ.hide();
  //     });
  // }








  getShipping_tax(ship_country, ship_zip){
    this.configServ.getData('/fedex_calculate_api.php?delivery_method=Delivery&ship_country='+ship_country+'&ship_zip='+ship_zip+'').then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
         this.shippingFee = res.shipping;
         this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
         this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;   
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }
  




  async segmentChanged(ev: any) {  
      console.log('Segment changed', this.active_segment);
      // await this.slider.slideTo(this.active_segment);  

      if(this.active_segment === '0' || this.active_segment === '2'){
        this.processingFee =  (this.setPro / this.setHun) *  +this.productPrice;
        this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
        console.log(this.processingFee );
        console.log(this.orderTotalPrice);
      }else if(this.active_segment === '1'){
        this.processingFee =  0;
        this.orderTotalPrice = +this.productPrice + +this.shippingFee + +this.taxFee + +this.processingFee;
        console.log(this.processingFee );
        console.log(this.orderTotalPrice);
      }else{
        this.presentToast('Segment error!')
      }

      if(this.active_segment === '2'){
        // document.location.href = "https://www.paypal.com/in/signin";
        this.InitPaypal();
      }
  }  






  async openThroghMY_Modal(){
    const modal = await this.modalCtrl.create({
      component: MonthYearPage,
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4],
      cssClass: 'square-modal',
      backdropDismiss:false
      });

      modal.onDidDismiss().then((data) => {
        // console.log(data.data);
        this.through_dateValue = data.data.exp;
        this.split_MM_YYYY = this.through_dateValue.split('/');
        this.card_exp_month = this.split_MM_YYYY[0];
        this.card_exp_year = this.split_MM_YYYY[1];
      });
      return await modal.present();
  }
  


  countChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }
  

  user_Make_Payment(form: FormGroup){
    console.log('Valid?', form.valid); // true or false
    if(this.active_segment === '0' || this.active_segment === '1'){
      if(form.valid === true){
        this.card_dt_err = false;
        this.configServ.show();
        this.payMethod_Data['userid'] = this.user_id;
        this.payMethod_Data['stripeToken'] = this.get_stripeToken;

        this.payMethod_Data['orderid'] = this.get_order_id;
        this.payMethod_Data['prodtype'] = this.get_prod_type;
        this.payMethod_Data['ordertype'] = this.get_order_type;

        this.payMethod_Data['ship_address'] = this.deliveryAddress_Data.ship_address;
        this.payMethod_Data['ship_apartment'] = this.deliveryAddress_Data.ship_apartment;
        this.payMethod_Data['ship_city'] = this.deliveryAddress_Data.ship_city;
        this.payMethod_Data['ship_country'] = this.deliveryAddress_Data.ship_country;
        this.payMethod_Data['ship_zip'] = this.deliveryAddress_Data.ship_zip;

        if(this.deliveryAddress_Data.ship_state === '000'){
          this.payMethod_Data['ship_state'] = this.deliveryAddress_Data.ship_state_name;
        }else{
          this.payMethod_Data['ship_state'] = this.deliveryAddress_Data.ship_state;
        }
    
        this.payMethod_Data['bill_address'] = this.deliveryAddress_Data.bill_address;
        this.payMethod_Data['bill_apartment'] = this.deliveryAddress_Data.bill_apartment;
        this.payMethod_Data['bill_country'] = this.deliveryAddress_Data.bill_country;
        this.payMethod_Data['bill_city'] = this.deliveryAddress_Data.bill_city;
        this.payMethod_Data['bill_zip'] = this.deliveryAddress_Data.bill_zip;

        if(this.deliveryAddress_Data.bill_state === '000'){
          this.payMethod_Data['bill_state'] = this.deliveryAddress_Data.bill_state_name;
        }else{
          this.payMethod_Data['bill_state'] = this.deliveryAddress_Data.bill_state;
        }
        this.payMethod_Data['phn'] = this.deliveryAddress_Data.ship_phn;

        

        if(this.stripe_publishablekey){
          this.card_number = this.card1+this.card2+this.card3+this.card4;
          let card = {
            number: form.value.number,
            expMonth: form.value.expMonth,
            expYear: form.value.expYear,
            cvc: form.value.cvc
          };
          this.stripe.createCardToken(card).then((token :any) => { 
            console.log(token);
            if(token.id){
               this.get_stripeToken = token.id;
               this.payMethod_Data['stripeToken'] = this.get_stripeToken;
              //  console.log(this.payMethod_Data);
                this.makeProduct_FinalPayment(this.payMethod_Data);
                 //  {
                 //   "card": {
                 //       "brand": "Visa",
                 //       "exp_month": 5,
                 //       "exp_year": 2024,
                 //       "funding": "credit",
                 //       "last4": "4242"
                 //   },
                 //   "id": "tok_1KrgR1AldTLhvutWx8p6Wtjx",
                 //   "created": "Sat Apr 23 16:13:27 GMT+05:30 2022",
                 //   "type": "card"
                 // }
            }else{
             this.presentToast('Error! Stripe Payment Token not found.');
            }
          }).catch(error => {
              this.presentToast(error); //  console.error(error) 
          });
        }else{
          this.presentToast('Stripe publishable key not found!');
        }
      }else if(form.valid === false){
         this.card_dt_err = true;
      }else{
        this.card_dt_err = true;
        this.presentToast('Card form valid error else!');
      }


    }else if(this.active_segment === '2'){
        // document.location.href = "https://www.paypal.com/in/signin";
        this.InitPaypal();
    }else{
        this.presentToast('Please select any one payment method!');
    }
  }





  // product complete or final payment and redirect
  makeProduct_FinalPayment(payMethod_Data){
    console.log(payMethod_Data);
    this.configServ.postData('/paymentmethod.php', payMethod_Data).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
         this.eventServ.publishCart('');
         this.checkStr.removeStore('user_myCart');
         this.router.navigate(['/pay-result'], {queryParams: {paymentStatus : true}})
      }else if(res.status === 'failed'){
         this.router.navigate(['/pay-result'], {queryParams: {paymentStatus : false}})
      }else if(res.status === 'required'){
          if(res.message.userid && res.message.stripeToken  && res.message.orderid && 
             res.message.ship_state && res.message.ship_zip && res.message.phn){
             this.presentToast(res.message.userid);
          }else if(res.message.userid){
             this.presentToast(res.message.userid);
          }else if(res.message.stripeToken){
             this.presentToast(res.message.stripeToken);
          }else if(res.message.orderid){
             this.presentToast(res.message.orderid);
          }else if(res.message.ship_state){
             this.presentToast(res.message.ship_state);
          }else if(res.message.ship_zip){
             this.presentToast(res.message.ship_zip);
          }else if(res.message.phn){
            this.presentToast(res.message.phn);
          }else{
             this.presentToast('Try again!');
          }
      }else if(res.status === 'failed'){
        this.presentToast(res.message);
      }else if(res.status === 'error'){
        this.presentToast(res.status+ ' : '+ res.message);
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }







  
  InitPaypal(){
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ASehCgwOA3FVWt_QLxyR2NqQES2rBVar0PNwi8P5vYWIoJ-dWuxi6XC-qZenP3wN35Atd-F1LcQStya2',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: ''+this._decimalPipe.transform(this.orderTotalPrice,"1.2-2")+'',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: ''+this._decimalPipe.transform(this.orderTotalPrice,"1.2-2")+'',
                }
              }
            },
            items: [{
                name: 'MinusWorlds Product.',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: ''+this._decimalPipe.transform(this.orderTotalPrice,"1.2-2")+'',
                },
              }]
          }]
      },
      advanced: { commit: 'true' },
      style: { label: 'paypal', layout: 'vertical', color:  'blue', shape:  'rect' },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.On_Paypal_PaymentSuccess(data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


  On_Paypal_PaymentSuccess(data){
    this.PayPal_Payment_Data['userid'] = this.user_id;

    this.PayPal_Payment_Data['orderid'] = this.get_order_id;
    this.PayPal_Payment_Data['prodtype'] = this.get_prod_type;
    this.PayPal_Payment_Data['ordertype'] = this.get_order_type;

    this.PayPal_Payment_Data['ship_address'] = this.deliveryAddress_Data.ship_address;
    this.PayPal_Payment_Data['ship_apartment'] = this.deliveryAddress_Data.ship_apartment;
    this.PayPal_Payment_Data['ship_city'] = this.deliveryAddress_Data.ship_city;
    this.PayPal_Payment_Data['ship_country'] = this.deliveryAddress_Data.ship_country;
    this.PayPal_Payment_Data['ship_zip'] = this.deliveryAddress_Data.ship_zip;

    if(this.deliveryAddress_Data.ship_state === '000'){
      this.PayPal_Payment_Data['ship_state'] = this.deliveryAddress_Data.ship_state_name;
    }else{
      this.PayPal_Payment_Data['ship_state'] = this.deliveryAddress_Data.ship_state;
    }

    this.PayPal_Payment_Data['bill_address'] = this.deliveryAddress_Data.bill_address;
    this.PayPal_Payment_Data['bill_apartment'] = this.deliveryAddress_Data.bill_apartment;
    this.PayPal_Payment_Data['bill_country'] = this.deliveryAddress_Data.bill_country;
    this.PayPal_Payment_Data['bill_city'] = this.deliveryAddress_Data.bill_city;
    this.PayPal_Payment_Data['bill_zip'] = this.deliveryAddress_Data.bill_zip;

    if(this.deliveryAddress_Data.bill_state === '000'){
      this.PayPal_Payment_Data['bill_state'] = this.deliveryAddress_Data.bill_state_name;
    }else{
      this.PayPal_Payment_Data['bill_state'] = this.deliveryAddress_Data.bill_state;
    }
    this.PayPal_Payment_Data['phn'] = this.deliveryAddress_Data.ship_phn;

    this.PayPal_Payment_Data['paypalData'] = data;

    console.log(this.PayPal_Payment_Data);

      this.eventServ.publishCart('');
      this.checkStr.removeStore('user_myCart');
      this.router.navigate(['/pay-result'], {queryParams: {paymentStatus : true}})
   
    // this.configServ.postData('/paypal_payment.php', this.PayPal_Payment_Data).then((res:any) => { //  console.log(res);
    //   this.configServ.hide();
    //   console.log(res);
       
    // }).catch( err => {
    //   this.configServ.hide();
    // });
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
    this.cardPayForm = new FormGroup({
      number: new FormControl(''),
      name: new FormControl(''),
      expMonth: new FormControl(''),
      expYear: new FormControl(''),
      cvc: new FormControl('')
    });

    this.cardPayForm = this.formb.group({
      number: [null, [Validators.required, Validators.minLength(16)]],
      name: [null, Validators.required],
      expMonth: [null, [Validators.required]],
      expYear: [null, [Validators.required]],
      cvc: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

}
