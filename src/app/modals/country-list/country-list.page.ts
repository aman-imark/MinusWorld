import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {
  @Input() countryData: string;

  allCountry_Data: any;
  returnCountry_Value: any;

  countryValue: any;
  countryid: any;
  countryname: any;


  searchbar: any;
  items: any;

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController,
    public configServ: ConfigService, public checkStr: SessionService,) 

    { }
  

  ionViewWillEnter(){
    this.getCountryData();
    this.countryValue = this.countryData;
    console.log(this.countryValue);
  }



  // ionViewWillLeave(){
  //   this.modalCtrl.dismiss(this.returnCountry_Value);
  // }


  

  dismiss() {
    if(this.countryValue != undefined){
      this.countryValue = this.countryValue.split('/');
      this.countryid = this.countryValue[0];
      this.countryname = this.countryValue[1];

      this.returnCountry_Value = {'countryid': this.countryid, 'countryname': this.countryname};
    }
    this.modalCtrl.dismiss(this.returnCountry_Value);
  } 




  searchVal(event){
     this.allCountry_Data.forEach((item) => {
       const shouldShow = this.allCountry_Data.indexOf(event.target.value) > -1;
       this.allCountry_Data.style.display = shouldShow ? 'block' : 'none';
     });
  }




  countrySelect_radio(ev){
    ev.stopPropagation();
    ev.preventDefault();
    console.log(ev)
    // console.log(ev.detail.value)
    // console.log(this.countryValue);

    // if(this.countryValue != undefined){
    //   this.countryValue = this.countryValue.split('/');
    //   this.countryid = this.countryValue[0];
    //   this.countryname = this.countryValue[1];

    //   this.returnCountry_Value = {'countryid': this.countryid, 'countryname': this.countryname};
    //   this.modalCtrl.dismiss(this.returnCountry_Value);
    // }
  }




  getCountryData(){
    this.configServ.getData('/country.php').then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
          this.allCountry_Data = res.countries_details;

          this.searchbar = document.querySelector('ion-searchbar');
          this.items = Array.from(document.querySelector('ion-radio-group').children);
      }else{
         this.presentToast(res.message);
      }
    }).catch( err => {
    });
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
    this.countryValue = this.countryData;
  }

}
