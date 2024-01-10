import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { FilterPage } from '../../../modals/filter/filter.page';
import { SortPage } from '../../../modals/sort/sort.page';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-newly-added',
  templateUrl: './newly-added.page.html',
  styleUrls: ['./newly-added.page.scss'],
})
export class NewlyAddedPage implements OnInit {

  // https://github.com/keephacking/ionic-scrolling-header
  // npm install ionic-scrolling-header --save

  @ViewChild("header") header: HTMLElement;
  @ViewChild("toolbar") toolbar: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;


    newlyAdded_Data: any;
      numOfData: number = 20;

    sort_filter: any = {
        start : "",
        end : "",
        userid : "",
        video_game_typ : "",
        console : "",
        grade : "",
        seal_grade : "",
        box_grade: "",
        min_vga : "",
        max_vga : "",
        variant : "",
        min_price : "",
        max_price : "",
        accepting_offers : "",
        game_developer : "",
        sort : ""
    };



  constructor(public modalCtrl: ModalController, public toastController: ToastController, private router: Router,
    public configServ: ConfigService, public checkStr: SessionService, public element: ElementRef, 
    public renderer: Renderer2, private platform: Platform) { }



  ionViewWillEnter(){
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    this.checkLogin();
    this.sort_filter['video_game_typ'] = '';
    this.sort_filter['console'] = '';
    this.sort_filter['grade'] = '';
    this.sort_filter['seal_grade'] = '';
    this.sort_filter['box_grade'] = '';
    this.sort_filter['min_vga'] = '';
    this.sort_filter['max_vga'] = '';
    this.sort_filter['variant'] = '';
    this.sort_filter['min_price'] = '';
    this.sort_filter['max_price'] = '';
    this.sort_filter['game_developer'] = '';
    this.sort_filter['sort'] = '';
    this.get_NewlyAdded_Data(this.sort_filter);
  }


  doRefresh(event) {
    setTimeout(() => {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.sort_filter['video_game_typ'] = '';
      this.sort_filter['console'] = '';
      this.sort_filter['grade'] = '';
      this.sort_filter['seal_grade'] = '';
      this.sort_filter['box_grade'] = '';
      this.sort_filter['min_vga'] = '';
      this.sort_filter['max_vga'] = '';
      this.sort_filter['variant'] = '';
      this.sort_filter['min_price'] = '';
      this.sort_filter['max_price'] = '';
      this.sort_filter['game_developer'] = '';
      this.sort_filter['sort'] = '';
      console.log(this.sort_filter)
      this.get_NewlyAdded_Data(this.sort_filter);
    }, 2000);
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

  
  onScroll(event) {
  if(this.platform.is('android')){
    if (event.detail.scrollTop >= 5) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'fixed');
      this.renderer.setStyle(this.toolbar['el'], 'top', '0px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
      this.renderer.setStyle(this.toolbar['el'], 'position', 'relative');
    }
  }
  }






  async sortClick(){
    const modal = await this.modalCtrl.create({
      component: SortPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4, 0.5]
      });

      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        // // {"sort" : "relevance"}
        if(data.data){
          if(data.data.sort == 'relevance'){ console.log(data.data.sort);
            
          }else if(data.data.sort == 'net_price ASC' || data.data.sort == 'net_price DESC' || 
                   data.data.sort == 'Recently Added' || data.data.sort == 'Recent Price Change'){
              this.sort_filter['userid'] = this.user_id;
              this.sort_filter['sort'] = data.data.sort;
              console.log(this.sort_filter);
              this.configServ.show();  
              this.get_NewlyAdded_Data(this.sort_filter);
                setTimeout(() => {
                  this.configServ.hide();          
                }, 2000);
  
          }
        }
      });
      return await modal.present();
  }


  async filterClick(){
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8, 0.9]
      });
      
      modal.onDidDismiss().then((data) => {
        console.log(data.data);
        if(data.data.filter){
           if(data.data.filter.vga_range.min == '10'){
              this.sort_filter['min_vga'] = "";
           }else{
              this.sort_filter['min_vga'] = data.data.filter.vga_range.min;
           }
           
             if(data.data.filter.vga_range.max == '100'){
                this.sort_filter['max_vga'] = "";
             }else{
                this.sort_filter['max_vga'] = data.data.filter.vga_range.max;
             }

           if(data.data.filter.prc_range.min == '10'){
              this.sort_filter['min_price'] = "";
           }else{
              this.sort_filter['min_price'] = data.data.filter.prc_range.min;
           }

             if(data.data.filter.prc_range.max == '20000'){
                this.sort_filter['max_price'] = "";
             }else{
                this.sort_filter['max_price'] = data.data.filter.prc_range.max;
             }


          if(data.data.filter.video_game_typ || data.data.filter.console || data.data.filter.grade || data.data.filter.seal_grade
            || data.data.filter.box_grade || data.data.filter.variant || data.data.filter.game_developer || this.sort_filter['min_vga']
            || this.sort_filter['max_vga'] || this.sort_filter['min_price'] || this.sort_filter['max_price']){
                 this.sort_filter['userid'] = this.user_id;
                 this.sort_filter['video_game_typ'] = data.data.filter.video_game_typ;
                 this.sort_filter['console'] = data.data.filter.console;
                 this.sort_filter['grade'] = data.data.filter.grade;
                 this.sort_filter['seal_grade'] = data.data.filter.seal_grade;
                 this.sort_filter['box_grade'] = data.data.filter.box_grade;
                 this.sort_filter['variant'] = data.data.filter.variant;
                 this.sort_filter['game_developer'] = data.data.filter.game_developer;
               console.log(this.sort_filter);
              this.configServ.show();  
              this.get_NewlyAdded_Data(this.sort_filter);
                setTimeout(() => {
                  this.configServ.hide();          
              }, 2000);
          }
        }
      });
      return await modal.present();
  }





  // \"start\":\"\",\r\n    \"end\":\"\",\r\n    \"userid\":\"9\",\r\n    \"video_game_typ\":\"\",\r\n    \"console\":\"\",\r\n    \"grade\":\"\",\r\n    \"seal_grade\":\"\",\r\n    \"box_grade\":\"\",\r\n    \"min_vga\":\"\",\r\n    \"max_vga\":\"\",\r\n    \"variant\":\"\",\r\n    \"min_price\":\"\",\r\n    \"max_price\":\"\",\r\n    \"accepting_offers\":\"\",\r\n    \"game_developer\":\"\",\r\n    \"sort\":\"\"\r\n}"

  get_NewlyAdded_Data(sort_filter_data){
    this.configServ.postData('/newlyadded.php', {"userid": this.user_id}).then((res:any) => {   console.log(res);
      if(res.status === 'success'){
        this.newlyAdded_Data = res.prod_details;
      }
    }).catch( err => {
    });
  }

  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      event.target.complete(); 
    }, 2000); 
  }









  goto_productDetails(prod_id, type){
    console.log('Go to Product detail page  ' + prod_id);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": "newly_added"} });
  }

  

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
