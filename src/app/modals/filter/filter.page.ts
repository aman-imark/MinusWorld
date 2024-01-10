import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ToastController } from '@ionic/angular';

// import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

// https://medium.com/ampersand-academy/ionic-4-modal-example-da9694fa0f53

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  returnFilterValue: any;

  consoleData: any;
  videoGameTypeData: any;
    gradeTypeData: any;
    boxGradeTypeData: any;
    sealGradeTypeData: any;
  variantsData: any;
  // gameDevData: any;


  vga_min = 10;
  vga_min_value = 10;
    vga_max = 100;
    vga_max_value = 100;


  prc_min = 10;
  prc_min_value = 10;
    prc_max = 20000;
    prc_max_value = 20000;


  vga_knobValues: Object = {
      upper: 100,
      lower: 10
  }


  prc_knobValues: Object = {
    upper: 20000,
    lower: 10
  }

  vga_rangeValues: Object = {
    min : this.vga_min_value,
    max : this.vga_max_value
  }


  prc_rangeValues: Object = {
    min : this.prc_min_value,
    max : this.prc_max_value
  }



  FilterData = {
    video_game_typ: "",
    console: "",
    grade: "",
    seal_grade: "",
    box_grade: "",
    variant: "",
    vga_range: this.vga_rangeValues,
    prc_range: this.prc_rangeValues
  }


  clear: boolean = false;
  apply: boolean = false;
  dismis: boolean = false;



   constructor(public toastCtrl: ToastController, public modalCtrl: ModalController,
    public configServ: ConfigService, public checkStr: SessionService)   {  }

 


  ionViewWillEnter(){
    this.check_MarketPlaceFilter();
  }

  check_MarketPlaceFilter(){  
    this.checkStr.getStore('marketPlaceFilter').then((data:any) => { 
      console.log(data)
      if(data == null || data == '' || typeof(data) == 'undefined'){
        this.getVideoGameType_Data();
        this.getConsole_Data();
        this.getGrade_Data();
    
        this.getSealGradeRange_Data();
        this.getBoxGradeRange_Data();
        this.getVariants_Data();
        // this.getGameDeveloper_Data();        

      }else{ 
        this.consoleData = data.consoleData;
        this.videoGameTypeData = data.videoGameTypeData;
        this.gradeTypeData = data.gradeTypeData;
          this.boxGradeTypeData = data.boxGradeTypeData;
        this.sealGradeTypeData = data.sealGradeTypeData;
        this.variantsData = data.variantsData;
        // this.gameDevData = data.gameDevData;

        this.vga_knobValues = data.vga_knobValues;
        this.vga_rangeValues = data.vga_rangeValues;

        this.prc_knobValues = data.prc_knobValues;
        this.prc_rangeValues = data.prc_rangeValues;
        
        console.log(this.consoleData);
      }
    }).catch( err => { });
  }




  getVideoGameType_Data(){
    this.configServ.postData('/videogametype.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.videoGameTypeData = res.video_game_details;
        this.videoGameTypeData.forEach(object => {
          object.selected = false;
        });
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }




  getConsole_Data(){
      this.configServ.postData('/console.php', {"showcount":"gamesforsale"}).then((res:any) => {  // console.log(res);
        if(res.status === 'success'){
          this.consoleData = res.console_details;
          this.consoleData.forEach(object => {
            object.selected = false;
          });
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
  }




  getGrade_Data(){
    this.configServ.postData('/grade.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.gradeTypeData = res.gradedetails;
        this.gradeTypeData.forEach(object => {
          object.selected = false;
        });
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }





  // wata seal grade
  getSealGradeRange_Data(){
    this.configServ.postData('/watasealgrade.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.sealGradeTypeData = res.sealgradedetails;
        this.sealGradeTypeData.forEach(object => {
          object.selected = false;
        });
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }



    // box seal grade
    getBoxGradeRange_Data(){
      this.configServ.postData('/boxgrade.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
        if(res.status === 'success'){
          this.boxGradeTypeData = res.boxgradedetails;
          this.boxGradeTypeData.forEach(object => {
            object.selected = false;
          });
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }
  
  



    getVariants_Data(){
      this.configServ.postData('/variants.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
        if(res.status === 'success'){
          this.variantsData = res.variants_details;
          this.variantsData.forEach(object => {
            object.selected = false;
          });
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }



    // getGameDeveloper_Data(){
    //   this.configServ.postData('/gamedeveloper.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
    //     if(res.status === 'success'){
    //       this.gameDevData = res.game_developer_details;
    //       this.gameDevData.forEach(object => {
    //         object.selected = false;
    //       });
    //     }else{
    //       this.presentToast(res.message);
    //     }
    //   }).catch( err => {
    //   });
    // }


  // vga grade range
  // getVGA_GradeScale_Data(){
  //   this.configServ.postData('/vgagrade.php', {"showcount":"gamesforsale"}).then((res:any) => {  // console.log(res);
  //     if(res.status === 'success'){
  //       this.vgaGradeType_Data = res.VGAgradedetails;
  //     }else{
  //       this.presentToast(res.message);
  //     }
  //   }).catch( err => {
  //   });
  // }





  vgaKnobValues_onChange(event){
    this.vga_min_value = event.target.value['lower'];
    this.vga_max_value = event.target.value['upper'];
      this.vga_rangeValues['min'] = this.vga_min_value;
      this.vga_rangeValues['max'] = this.vga_max_value;
    // console.log(this.rangeValues);
  }


  prcKnobValues_onChange(event){
    this.prc_min_value = event.target.value['lower'];
    this.prc_max_value = event.target.value['upper'];
      this.prc_rangeValues['min'] = this.prc_min_value;
      this.prc_rangeValues['max'] = this.prc_max_value;
    // console.log(this.rangeValues);
  }
 

  videoGameTypeData_FVal(val){
    // // console.log(val);
    // const a = Object.keys(val);
    // const aa = a.filter(function(key) {
    //     return val[key]
    // });

    // // this.FilterData['video_game_typ'] =  JSON.stringify(Object.assign({}, aa));
    // this.FilterData['video_game_typ'] =  aa.toString();
  }

  consoleData_FVal(val){
    // // console.log(val);
    // const b = Object.keys(val);
    // const bb = b.filter(function(key) {
    //     return val[key]
    // });
    // this.FilterData['console'] =  bb.toString();
  }

  gradeData_FVal(val){
    // // console.log(val);
    // const c = Object.keys(val);
    // const cc = c.filter(function(key) {
    //     return val[key]
    // });
    // this.FilterData['grade'] =  cc.toString();
  }

  wataSealData_FVal(val){
    // // console.log(val);
    // const d = Object.keys(val);
    // const dd = d.filter(function(key) {
    //     return val[key]
    // });
    // this.FilterData['seal_grade'] =  dd.toString();
  }

  wataBoxData_FVal(val){
    // // console.log(val);
    // const e = Object.keys(val);
    // const ee = e.filter(function(key) {
    //     return val[key]
    // });
    // this.FilterData['box_grade'] =  ee.toString();
  }

  variantData_FVal(val){
    // // console.log(val);
    // const f = Object.keys(val);
    // const ff = f.filter(function(key) {
    //     return val[key]
    // });
    // this.FilterData['variant'] =  ff.toString();
  }

  // gameDevData_FVal(val){
  //   // // console.log(val);
  //   // const g = Object.keys(val);
  //   // const gg = g.filter(function(key) {
  //   //     return val[key]
  //   // });
  //   // // this.FilterData['game_developer'] =  gg.toString();
  // }






  applyFilter(){
    this.checkStr.setStore('marketPlaceFilter', {"consoleData" :this.consoleData,
     "videoGameTypeData": this.videoGameTypeData, "gradeTypeData": this.gradeTypeData,
     "boxGradeTypeData": this.boxGradeTypeData, "sealGradeTypeData": this.sealGradeTypeData, "variantsData": this.variantsData, 
     "vga_knobValues": this.vga_knobValues, "vga_rangeValues": this.vga_rangeValues, 
     "prc_knobValues": this.prc_knobValues, "prc_rangeValues": this.prc_rangeValues});

    this.checkStr.getStore('marketPlaceFilter').then((data:any) => { 
      console.log(data)  
      if(data != null || data != '' || typeof(data) != 'undefined'){

        const aa = data.consoleData.filter(x => x.selected === true);
        const aa_ids = aa.map((obj) => {
          return obj.id;
        });
        const aaa_ids = aa_ids.toString();


        const cc = data.videoGameTypeData.filter(x => x.selected === true);
        const cc_ids = cc.map((obj) => {
          return obj.id;
        });
        const ccc_ids = cc_ids.toString();



        const dd = data.gradeTypeData.filter(x => x.selected === true);
        const dd_ids = dd.map((obj) => {
          return obj.id;
        });
        const ddd_ids = dd_ids.toString();


        const ff = data.boxGradeTypeData.filter(x => x.selected === true);
        const ff_ids = ff.map((obj) => {
          return obj.id;
        });
        const fff_ids = ff_ids.toString();



        const gg = data.sealGradeTypeData.filter(x => x.selected === true);
        const gg_ids = gg.map((obj) => {
          return obj.id;
        });
        const ggg_ids = gg_ids.toString();



        const hh = data.variantsData.filter(x => x.selected === true);
        const hh_ids = hh.map((obj) => {
          return obj.id;
        });
        const hhh_ids = hh_ids.toString();



        this.vga_rangeValues = {
          min : data.vga_knobValues.lower,
          max : data.vga_knobValues.upper,
        }

        this.prc_rangeValues = {
          min : data.prc_knobValues.lower,
          max : data.prc_knobValues.upper,
        }


        this.FilterData = {
          video_game_typ: ccc_ids,
          console: aaa_ids,
          grade: ddd_ids,
          seal_grade: ggg_ids,
          box_grade: fff_ids,
          variant: hhh_ids,
          vga_range: this.vga_rangeValues,
          prc_range: this.prc_rangeValues
        };
      
          console.log(this.FilterData);
          this.clear = false;
          this.apply = true;
          this.dismis = false;
          this.returnFilterValue = {'filter': this.FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
          console.log(this.returnFilterValue)
          this.modalCtrl.dismiss(this.returnFilterValue);
      }else{  }
    }).catch( err => { });

    // this.clear = false;
    // this.returnFilterValue = {'filter': this.FilterData, 'clear': this.clear};
    // console.log(this.returnFilterValue)
    // this.modalCtrl.dismiss(this.returnFilterValue);
  }







  clearFilter(){
    this.checkStr.removeStore('marketPlaceFilter');
    this.clear = true;
    this.apply = false;
    this.dismis = false;
    this.returnFilterValue = {'filter': this.FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
    console.log(this.returnFilterValue)
    this.modalCtrl.dismiss(this.returnFilterValue);
  }







  dismiss() {
    // this.modalCtrl.dismiss();
    this.clear = false;
    this.apply = false;
    this.dismis = true;
    this.returnFilterValue = {'filter': this.FilterData, 'clear': this.clear, 'apply': this.apply, 'dismis': this.dismis};
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
