import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute,} from '@angular/router';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.scss'],
})
export class SideHeaderComponent implements OnInit {

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

  constructor(private navCtrl: NavController, public configServ: ConfigService, public checkStr: SessionService)
  

  {
    this.checkLogin();
  }


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
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    }).catch( err => {
      this.isLoggedIn = false;
    });
  }




  go_to_notifications(){
    // this.router.navigate(['/notifications']);
    this.navCtrl.navigateRoot('/notifications');
  }

  go_to_cart(){
    this.navCtrl.navigateRoot('/mycart');
  }

  go_to_profile(){
    this.navCtrl.navigateRoot('/maintabs/tabs/tab5');
  }

  go_to_login(){
    this.navCtrl.navigateRoot('/login');
  }


  ngOnInit() {}

}
