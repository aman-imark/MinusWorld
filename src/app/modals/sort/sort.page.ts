import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-sort',
  templateUrl: './sort.page.html',
  styleUrls: ['./sort.page.scss'],
})
export class SortPage implements OnInit {

  returnSortValue;
  sortValue;

  clear: boolean = false;

  constructor(public modalCtrl: ModalController, public configServ: ConfigService, public checkStr: SessionService) { }

  

  ionViewWillEnter(){
    this.check_marketPlaceSort();
  }

  
  check_marketPlaceSort(){  
    this.checkStr.getStore('marketPlaceSort').then((data:any) => { 
      // console.log(data)  
      if(data == null || data == '' || typeof(data) == 'undefined'){
        this.sortValue = 'relevance';
      }else{ 
        this.sortValue = data.sortBy;
      }
    }).catch( err => { });
  }




    marketPlaceSort_select(val){
      this.sortValue = val;
      console.log(this.sortValue)
      this.checkStr.setStore('marketPlaceSort', {"sortBy": this.sortValue});
      this.checkStr.getStore('marketPlaceSort').then((data:any) => { 
      // console.log(data)
        if(data != null || data != '' || typeof(data) != 'undefined'){
          this.sortValue = data.sortBy;
          this.clear = false;
          this.returnSortValue = {'sort': this.sortValue, 'clear': this.clear};
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
      this.returnSortValue = {'sort': this.sortValue, 'clear': this.clear};
      console.log(this.returnSortValue)
      this.modalCtrl.dismiss(this.returnSortValue);
    } 



  ngOnInit() {
  }

}
