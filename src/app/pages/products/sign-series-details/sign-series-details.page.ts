import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { FilterPage } from '../../../modals/filter/filter.page';
import { SortPage } from '../../../modals/sort/sort.page';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';

import { Share } from '@capacitor/share';


@Component({
  selector: 'app-sign-series-details',
  templateUrl: './sign-series-details.page.html',
  styleUrls: ['./sign-series-details.page.scss'],
})
export class SignSeriesDetailsPage implements OnInit {

  sign_product_id: any;

  signDetails: any;

  
  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, private platform: Platform,
    public activatedRoute : ActivatedRoute) { }



    ionViewWillEnter(){
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.sign_product_id = res.sr_id;    
        // recently_sold, featured_games, newly_added, search_product, seller_product, releted_product, gameforsale
        this.get_signSeries_Details(res.sr_id);
       });
     
    }
  

  get_signSeries_Details(sr_id){
    this.configServ.show();
    this.configServ.postData('/signature-product-details.php', {product_id: sr_id}).then((res:any) => {   console.log(res);
    this.configServ.hide();
      if(res.status === 'success'){
        this.signDetails = res.prod_details[0];
      }
    }).catch( err => {
    });
  }


  async signSeries_DetailsShare(){
    await Share.share({
      title: 'Welcome to Minus Worlds! ',
      text: 'Really awesome! Your one-stop shop for rare games and knowledge!',
      url: 'https://minusworlds.com/',
      dialogTitle: 'Share with your friends',
    });
}


  
  ngOnInit() {
  }

}
