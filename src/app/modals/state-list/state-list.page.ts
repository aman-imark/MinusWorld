import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.page.html',
  styleUrls: ['./state-list.page.scss'],
})
export class StateListPage implements OnInit {
  @Input() countryid: string;
  @Input() stateData: string;

  allState_Data: any;
  returnState_Value: any;

  stateValue: any;
  stateid: any;
  statename: any;


  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController,
    public configServ: ConfigService, public checkStr: SessionService) 
    { 
    }
  

  ionViewWillEnter(){
    this.getStateData(this.countryid);
    this.stateValue = this.stateData;
    console.log(this.stateValue);
  }

  dismiss() {
    console.log(this.stateValue);
    if(this.stateValue != undefined){
      this.stateValue = this.stateValue.split('/');
      this.stateid = this.stateValue[0];
      this.statename = this.stateValue[1];

      this.returnState_Value = {'stateid': this.stateid, 'statename': this.statename};
    }
    this.modalCtrl.dismiss(this.returnState_Value);
  } 




  getStateData(countryid){
    this.configServ.postData('/state.php', {"countryid": countryid}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
          this.allState_Data = res.state_details;
      }else{
         this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }


  stateSelect_radio(ev){
    console.log(ev.detail.value)
    console.log(this.stateValue);
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
    this.stateValue = this.stateData;
  }

}
