import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mw-sort',
  templateUrl: './mw-sort.page.html',
  styleUrls: ['./mw-sort.page.scss'],
})
export class MwSortPage implements OnInit {

  
  returnSortValue;
  mwsortValue;

  clear: boolean = false;

  constructor(public modalCtrl: ModalController, public configServ: ConfigService, public checkStr: SessionService) { }

   ionViewWillEnter(){
     this.check_MWsort();
   }

   
   check_MWsort(){  
    this.checkStr.getStore('mwSort').then((data:any) => { 
      // console.log(data)  
      if(data == null || data == '' || typeof(data) == 'undefined'){
        this.mwsortValue = 'relevance';
      }else{ 
        this.mwsortValue = data.sortBy;
      }
    }).catch( err => { });
  }


 


    mwSort_select(val){
      this.mwsortValue = val;
      console.log(this.mwsortValue)
      this.checkStr.setStore('mwSort', {"sortBy": this.mwsortValue});
      this.checkStr.getStore('mwSort').then((data:any) => { 
      // console.log(data)
        if(data != null || data != '' || typeof(data) != 'undefined'){
          this.mwsortValue = data.sortBy;
          this.clear = false;
          this.returnSortValue = {'sort': this.mwsortValue, 'clear': this.clear};
          setTimeout(() => {
            this.modalCtrl.dismiss(this.returnSortValue);
          }, 1500);
        }else{  }
      }).catch( err => { });
      // this.returnSortValue = {'sort': this.mwsortValue};
      // console.log(this.returnSortValue);
      // this.modalCtrl.dismiss(this.returnSortValue);
    }



    dismiss() {
      this.clear = true;
      this.returnSortValue = {'sort': this.mwsortValue, 'clear': this.clear};
      console.log(this.returnSortValue)
      this.modalCtrl.dismiss(this.returnSortValue);
    } 

  ngOnInit() {
  }
  
}
