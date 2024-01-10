import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mw-filter',
  templateUrl: './mw-filter.page.html',
  styleUrls: ['./mw-filter.page.scss'],
})
export class MwFilterPage implements OnInit {

  // https://plnkr.co/edit/yV94ZjypwBgHAlb0RLK2?p=preview&preview
  // https://www.freakyjolly.com/ionic-multiple-checkbox-validation-using-formcontrol/

  // https://sbsharma.com/ionic-product-sorting-and-searching/

  returnFilterValue;
  mwCat_Data: any;
 

  prc_min = 25;
  prc_min_value = 25;
    prc_max = 35;
    prc_max_value = 35;

  knobValues: Object = {
    upper: 35,
    lower: 25
  }

  rangeValues: Object = {
    min : this.prc_min_value,
    max : this.prc_max_value
  }


  mw_FilterData = {
    range: this.rangeValues,
    categories: ''
  }

  clear: boolean = false;
  apply: boolean = false;
  dismis: boolean = false;


  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController,
    public configServ: ConfigService, public checkStr: SessionService)    
    { }
    
  // { 
  //   const dualRange = document.querySelector('#dual-range');
  //   // dualRange.value = { lower: 33, upper: 60 };
  // }





  ionViewWillEnter(){
    this.check_MWfilter();
  }



  check_MWfilter(){  
    this.checkStr.getStore('mwFilter').then((data:any) => { 
      // console.log(data)
      if(data == null || data == '' || typeof(data) == 'undefined'){
        this.get_MWstore_category();
      }else{ 
          this.mwCat_Data = data.category;
          console.log(this.mwCat_Data)
          this.knobValues = data.knobValues;
          this.rangeValues = data.rangeValues;
      }
    }).catch( err => { });
  }





  get_MWstore_category(){
    this.configServ.getData('/mwstore_category.php').then((res:any) => {  // console.log(res);
      // console.log(res);
      if(res.status === 'success'){
          this.mwCat_Data = res.result;
          // console.log(this.mwCat_Data);
          this.mwCat_Data.forEach(object => {
            object.selected = false;
          });
          this.checkStr.setStore('mwFilter', {"category" :this.mwCat_Data, "knobValues": this.knobValues, "rangeValues": this.rangeValues});
      }else{
         this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }





  knobValues_onChange(event){
    this.prc_min_value = event.target.value['lower'];
    this.prc_max_value = event.target.value['upper'];
      this.rangeValues['min'] = this.prc_min_value;
      this.rangeValues['max'] = this.prc_max_value;
      if(this.rangeValues['min'] > '25' || this.rangeValues['max'] < '35'){
      }else{
      }
  }






  
  categories_FormValues(ch_val: any){
    // console.log(this.mwCat_Data)

    // const typ_vg = Object.keys(ch_val);
    // const filtered = typ_vg.filter(function(key) {
    //     return ch_val[key]
    // });
    // if(filtered.length === 0){
    //   this.mw_FilterData.categories = '';
    // }else if(filtered.length >= 1){
    //   this.mw_FilterData.categories =  filtered.toString();
    // }else{
    //   this.mw_FilterData.categories = '';
    // }
  }








  applyFilter(){
    this.checkStr.setStore('mwFilter', {"category" :this.mwCat_Data, "knobValues": this.knobValues, "rangeValues": this.rangeValues});

    this.checkStr.getStore('mwFilter').then((data:any) => { 
      console.log(data)  
      if(data != null || data != '' || typeof(data) != 'undefined'){
        this.rangeValues = {
          min : data.knobValues.lower,
          max : data.knobValues.upper,
        }

        const filterTrue = data.category.filter(x => x.selected === true);
        const get_ids = filterTrue.map((obj) => {
          return obj.id;
        });

        const cat_ids = get_ids.toString();

        this.mw_FilterData = {
          range: this.rangeValues,
          categories: cat_ids
        }
          console.log(this.mw_FilterData);
          this.clear = false;
          this.apply = true;
          this.dismis = false;
          this.returnFilterValue = {'filter': this.mw_FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
          console.log(this.returnFilterValue)
          this.modalCtrl.dismiss(this.returnFilterValue);
      }else{  }
    }).catch( err => { });

    // this.clear = false;
    // this.returnFilterValue = {'filter': this.mw_FilterData, 'clear': this.clear};
    // console.log(this.returnFilterValue)
    // this.modalCtrl.dismiss(this.returnFilterValue);
  }

    





  clearFilter(){
    this.checkStr.removeStore('mwFilter');
    this.clear = true;
    this.apply = false;
    this.dismis = false;
    this.returnFilterValue = {'filter': this.mw_FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
    console.log(this.returnFilterValue)
    this.modalCtrl.dismiss(this.returnFilterValue);
  }





  dismiss() {
    // this.modalCtrl.dismiss();
    this.clear = false;
    this.apply = false;
    this.dismis = true;
    this.returnFilterValue = {'filter': this.mw_FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
    console.log(this.returnFilterValue)
    this.modalCtrl.dismiss(this.returnFilterValue);
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
