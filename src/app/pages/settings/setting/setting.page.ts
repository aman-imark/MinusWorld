import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, Platform, NavController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { IonContent, ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { ModalController } from '@ionic/angular';

import { CountryListPage } from '../../../modals/country-list/country-list.page';
import { StateListPage } from '../../../modals/state-list/state-list.page';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild("header") header: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

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
      ship_address : "",
      ship_apartment : "",
      ship_city : "",
      ship_country : "",
      ship_state : "",
      ship_zip : "",
      bill_address : "",
      bill_apartment : "",
      bill_city : "",
      bill_country : "",
      bill_state : "",
      bill_zip : ""
    }

    // spaceRest = "/^[a-zA-Z\s]*$/";
    ubd_state_name: String = '';
    usd_state_name: String = '';

      constructor(public toastCtrl: ToastController,private location: Location, public alertCtrl: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, private navCtrl : NavController,
              public renderer: Renderer2, public modalCtrl: ModalController, private platform: Platform) { }

  


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
             this.isSameAddress = true;

             this.updAddr['userid'] = this.user_id;
             this.getUserAdddress_Data(this.user_id);
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
  
 
    getUserAdddress_Data(userid){
      this.configServ.postData('/addresssettings.php', {"userid": userid}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
            this.userAddress_Data = res;
            this.userBillingAddrs_Data = res.BillingAddrrss;
                this.ubd_address = res.BillingAddrrss.streetaddress;
                this.ubd_apartment = res.BillingAddrrss.apartment;
                this.ubd_city = res.BillingAddrrss.city;
                if(res.BillingAddrrss.stateName == null){
                  this.ubd_state_name = res.BillingAddrrss.stateId;
                }else{
                  this.ubd_state = res.BillingAddrrss.stateName;
                }
                this.ubd_stateid = res.BillingAddrrss.stateId;
                this.ubd_country = res.BillingAddrrss.countryName;
                this.ubd_countryid = res.BillingAddrrss.countryId;
                this.ubd_zip = res.BillingAddrrss.zip;
            this.userShippingAddrs_Data = res.ShippingAddrrss;
                this.usd_address = res.ShippingAddrrss.streetaddress;
                this.usd_apartment = res.ShippingAddrrss.apartment;
                this.usd_city = res.ShippingAddrrss.city;
                if(res.ShippingAddrrss.stateName == null){
                  this.usd_state_name = res.ShippingAddrrss.stateId;
                }else{
                  this.usd_state = res.ShippingAddrrss.stateName;
                }
                this.usd_stateid = res.ShippingAddrrss.stateId;
                this.usd_country = res.ShippingAddrrss.countryName;
                this.usd_countryid = res.ShippingAddrrss.countryId;
                this.usd_zip = res.ShippingAddrrss.zip;           
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
          console.log(data);
          console.log(data.data);
          if(data.data != undefined){
            this.ubd_country = data.data.countryname;
            this.ubd_countryid = data.data.countryid; 
            if(this.ubd_countryid == '38' || this.ubd_countryid == '223'){
              this.ubd_state = this.ubd_state
              this.ubd_stateid = this.ubd_stateid;
            }else{
              this.ubd_state = this.ubd_state;
              this.ubd_stateid = this.ubd_stateid;              
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
        backdropDismiss: false, 
        componentProps: {
          countryid: this.ubd_countryid,
          // stateData: this.ubd_stateid+'/'+this.ubd_state,
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
  

    async open_addCountryModal_ship(){
      const modal = await this.modalCtrl.create({
        component: CountryListPage,
        initialBreakpoint: 1,
        breakpoints: [0, 0.9, 1],
        backdropDismiss: false,
        componentProps: {
          countryData: this.usd_countryid+'/'+this.usd_country,
        }
        });
  
        modal.onDidDismiss().then((data) => {
          console.log(data.data);
          if(data.data != undefined){
            this.usd_country = data.data.countryname;
            this.usd_countryid = data.data.countryid; 
            if(this.usd_countryid == '38' || this.usd_countryid == '223'){
              this.usd_state = this.usd_state
              this.usd_stateid = this.usd_stateid;
            }else{
              this.usd_state = this.usd_state;
              this.usd_stateid = this.usd_stateid;              
            }
          }
        });
        return await modal.present();
    }
  
    async open_addStateModal_ship(){
      const modal = await this.modalCtrl.create({
        component: StateListPage,
        initialBreakpoint: 1,
        breakpoints: [0, 0.9, 1],
        backdropDismiss: false,
        componentProps: {
          countryid: this.usd_countryid,
        }
        });
  
        modal.onDidDismiss().then((data) => {
          console.log(data.data);
          if(data.data != undefined){
            this.usd_state = data.data.statename;
            this.usd_stateid = data.data.stateid;
          }
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
  


  user_updateAddress(){
    if(this.isSameAddress  ===  true){
       this.updAddr['ship_address'] = this.ubd_address;
       this.updAddr['ship_apartment'] = this.ubd_apartment;
       this.updAddr['ship_city'] = this.ubd_city;
       this.updAddr['ship_country'] = this.ubd_countryid;
        if(this.ubd_countryid == '38' || this.ubd_countryid == '223'){
            this.updAddr['ship_state'] = this.ubd_stateid;
        }else{
            this.updAddr['ship_state'] = this.ubd_state_name;
        }  
       this.updAddr['ship_zip'] = this.ubd_zip;
       this.updAddr['bill_address'] = this.ubd_address;
       this.updAddr['bill_apartment'] = this.ubd_apartment;
       this.updAddr['bill_city'] = this.ubd_city;
       this.updAddr['bill_country'] = this.ubd_countryid;
        if(this.ubd_countryid == '38' || this.ubd_countryid == '223'){
            this.updAddr['bill_state'] = this.ubd_stateid;
        }else{
            this.updAddr['bill_state'] = this.ubd_state_name;
        }  
       this.updAddr['bill_zip'] = this.ubd_zip;

  
    }else if(this.isSameAddress  ===  false){
      this.updAddr['ship_address'] = this.usd_address;
      this.updAddr['ship_apartment'] = this.usd_apartment;
      this.updAddr['ship_city'] = this.usd_city;
      this.updAddr['ship_country'] = this.usd_countryid;
        if(this.usd_countryid == '38' || this.usd_countryid == '223'){
            this.updAddr['ship_state'] = this.usd_stateid;
        }else{
            this.updAddr['ship_state'] = this.usd_state_name;
        }  
      this.updAddr['ship_zip'] = this.usd_zip;
      this.updAddr['bill_address'] = this.ubd_address;
      this.updAddr['bill_apartment'] = this.ubd_apartment;
      this.updAddr['bill_city'] = this.ubd_city;
      this.updAddr['bill_country'] = this.ubd_countryid;
        if(this.ubd_countryid == '38' || this.ubd_countryid == '223'){
            this.updAddr['bill_state'] = this.ubd_stateid;
        }else{
            this.updAddr['bill_state'] = this.ubd_state_name;
        }  
      this.updAddr['bill_zip'] = this.ubd_zip;
    }
    // console.log(this.updAddr);


    if(this.updAddr['ship_address'] && this.updAddr['ship_city'] && this.updAddr['ship_country'] 
       && this.updAddr['ship_state'] && this.updAddr['ship_zip'] && this.updAddr['bill_address'] &&
       this.updAddr['bill_city'] && this.updAddr['bill_country'] && this.updAddr['bill_state'] && this.updAddr['bill_zip']){
        
        console.log('valid one ');
        this.validation = true;
        this.content.scrollToTop(2000);

        if(this.updAddr['ship_address'] != ' ' && this.updAddr['ship_city'] != ' ' && 
           this.updAddr['ship_country'] != ' ' && this.updAddr['ship_state'] != ' ' && this.updAddr['ship_zip'] != ' ' && 
           this.updAddr['bill_address'] != ' ' &&  this.updAddr['bill_city'] != ' ' && 
           this.updAddr['bill_country'] != ' ' && this.updAddr['bill_state'] != ' ' && this.updAddr['bill_zip']) {
        
              console.log('valid Two ');
              console.table(this.updAddr);
              this.validation = false;
              this.configServ.show();
              this.configServ.postData('/updateaddresssettings.php', this.updAddr).then((res:any) => {  // console.log(res);
                console.log(res);
                this.configServ.hide();
                if(res.status === 'success'){
                  setTimeout( () => {
                    this.navCtrl.navigateBack(['/maintabs/tabs/tab5'])
                  }, 2000);
                  this.presentToast(res.message);
                }else{
                  this.presentToast(res.message);
                }
              }).catch( err => {
              });
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
