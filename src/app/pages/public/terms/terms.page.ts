import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';

import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  dym_content: any;

  constructor(private navCtrl: NavController, private router: Router,
    public toastController: ToastController, private platform: Platform,
    public alrtCtrl: AlertController, public configServ: ConfigService) { }


  ionViewWillEnter() {
    this.getTermOfUseData();
  }
  
  async getTermOfUseData(){
      this.configServ.getData('/termofuse.php').then((res:any) => {  // console.log(res);
        console.log(res);
        this.dym_content = res.content;
      }).catch( err => {
        // alert(JSON.stringify(err));
      });
  }

  
  ngOnInit() {
  }

}
