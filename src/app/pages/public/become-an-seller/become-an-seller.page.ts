import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { ConfigService } from '../../../services/config.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-become-an-seller',
  templateUrl: './become-an-seller.page.html',
  styleUrls: ['./become-an-seller.page.scss'],
})
export class BecomeAnSellerPage implements OnInit {

  mwsellers: any;

  mwsellerdetails_Data: any;
  whychoosedetails_Data: any;
  ourteam_Data: any;

  slideOpts = {
    zoom: false,
    initialSlide: 1,  
    speed: 600,  
    autoplay: {
      delay: 5000,
    },
    loop: false,
    pager: true
  };


  constructor(private navCtrl: NavController, private router: Router,
    public toastController: ToastController, private platform: Platform,
    public alrtCtrl: AlertController, public configServ: ConfigService) { }


  ionViewWillEnter() {
    this.getBecomeAnSeller_Data();
  }
  
  async getBecomeAnSeller_Data(){
      this.configServ.getData('/mwsellers.php').then((res:any) => {   console.log(res);
        if(res.status === 'success'){
          this.mwsellerdetails_Data = res.mwsellerdetails;
          this.whychoosedetails_Data = res.whychoosedetails;
          this.ourteam_Data = res.ourteam;
        }else{
           this.presentToast(res.message);
        }
      }).catch( err => {
        // alert(JSON.stringify(err));
      });
  }

//   {
//     "status": "success",
//     "message": "MW Seller Results Found",
//     "mwsellerdetails": {
//         "heading": "Minus World Seller",
//         "content": "<p>We know convenince matters, we are to take care of the headaches so you do not have to. Feel free to apply today by registering at MinusWorlds.com and clicking Apply to be a Seller to join!&nbsp;</p>"
//     },
//     "whychoosedetails": {
//         "heading": "Can we Answer any Questions for you?",
//         "image": "https://minusworlds.com/uploads/140929694_About-US-12.png",
//         "whychoosefaq": [
//             {
//                 "heading": "Wait??!?!? There has to be a trick?",
//                 "content": "<p>No trick, how we make our percantage is that we add a fee on top of the \"net price\" the seller wants when it goes to list so the seller gets the price they wanted and the buyer does not get suprised with any fees at checkout.&nbsp;</p>"
//             },
//             {
//                 "heading": "Is there any Seller Fees?",
//                 "content": "<p>There are no seller fees, you put the price you want and that is the price you get!&nbsp;</p>"
//             },
//             {
//                 "heading": "Can I sell on Minus Worlds?",
//                 "content": "<p>Yes, we accept applications daily. Email us at <a href=\"mailto:sellers@minusworlds.com\">sellers@minusworlds.com</a> to apply today!</p>"
//             }
//         ]
//     },
//     "ourteam": [
//         {
//             "image": "https://minusworlds.com/uploads/818848539_About-US-16.png",
//             "name": "Jackson Nash",
//             "designation": "Supporter",
//             "facebook": "http://facebook.com",
//             "twitter": "http://twitter.com",
//             "linkedin": "",
//             "skype": "sadsd",
//             "instagram": "http://instagram.com"
//         },
//         {
//             "image": "https://minusworlds.com/uploads/190132958_About-US-18.png",
//             "name": "Alex Manning",
//             "designation": "CEO-Founder",
//             "facebook": "http://facebook.com",
//             "twitter": "http://twitter.com",
//             "linkedin": "http://linkedin.com",
//             "skype": "",
//             "instagram": "http://instagram.com"
//         },
//         {
//             "image": "https://minusworlds.com/uploads/611573563_About-US-20.png",
//             "name": "Ollie Schneider",
//             "designation": "Shipper",
//             "facebook": "http://facebook.com",
//             "twitter": "http://twitter.com",
//             "linkedin": "http://linkedin.com",
//             "skype": "skype.com",
//             "instagram": "http://instagram.com"
//         }
//     ]
// }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      mode: "md"
    });
    toast.present();
  }


  ngOnInit() {
  }

}
