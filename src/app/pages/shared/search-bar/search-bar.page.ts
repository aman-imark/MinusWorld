import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { Platform,  AlertController, ToastController } from '@ionic/angular';

import { FilterPage } from '../../../modals/filter/filter.page';
import { SortPage } from '../../../modals/sort/sort.page';

import { IonSearchbar } from '@ionic/angular';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.page.html',
  styleUrls: ['./search-bar.page.scss'],
})
export class SearchBarPage implements OnInit {

  // searchBar

  // @ViewChild('searchBar') searchBox;
  // @ViewChild('autofocus', { static: false }) searchbar: IonSearchbar;

  // @ViewChild(IonSearchbar) myInput: IonSearchbar;
  @ViewChild('searchBar', { static: false }) searchbar: IonSearchbar;

  searchKeyword;
  searchKeyword2;
 
  searchResult_Data;

  numOfData: number = 10;

  skeleton: boolean = false;
  isResult: boolean = true;

  searchCategories = '2';
  searchCategories_status: boolean = true;



  searchInput_Data: Object = {
      start : "",
      end : "",
      searchstring : "",
      prod_type : "",
      advancesearchstring : "",
      status : "",
      userid : "",
      video_game_typ : "",
      console : "",
      grade : "",
      seal_grade : "",
      box_grade : "",
      min_vga : "",
      max_vga : "",
      variant : "",
      min_price : "",
      max_price : "",
      accepting_offers : "",
      game_developer : "",
      series : "",
      yearofrelease : "",
      grading_company : "",
      sort : ""
  }




  constructor(private router: Router, public modalCtrl: ModalController,private platform: Platform, private toastController: ToastController,
    public alrtCtrl: AlertController, public configServ: ConfigService) { }

    ionViewDidLoad(){
      // setTimeout(() => {
      //   this.searchBox.setFocus();
      // }, 500);
      // setTimeout(() => { this.myInput.setFocus(); }, 150);
      setTimeout(() => this.searchbar.setFocus(), 300);
    }


  ionViewWillEnter(){
 
  }


  spaceRest(event) {
    event.target.value = event.target.value.replace(/  +/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }


  clearInputVal(event){
     this.isResult = true;
  }


  searchFunctionClicked(val: string){
    console.log('fdf >>' +val)
    console.log('fdf LNG>>' +val.length)
    // this.searchInput_Data['searchstring'] = 'Buckeroos';
    
    this.searchInput_Data['prod_type'] = this.searchCategories;
    this.searchInput_Data['searchstring'] = val;
    // this.searchInput_Data['advancesearchstring'] = val;
    // console.log(val);
    console.log(this.searchInput_Data);

    if(val != '' && val != ' ' && val != null && val != undefined){     
      this.skeleton = true; 
      this.configServ.postFormData('/searchresult.php', this.searchInput_Data).then((res:any) => {  console.log(res);
        
        if(res.status === 'success'){
          if(res.prod_details){
             this.skeleton = false; 
             this.searchResult_Data = res.prod_details;
             if(this.searchResult_Data.length >= 1){
                this.searchCategories_status = false;
                this.isResult = true;
             }else{
                this.searchCategories_status = true;
                this.isResult = false;
             }
          }else{
             this.skeleton = false; 
             this.presentToast(res.message);
          }
        }else if(res.status === 'required'){
           this.skeleton = false; 
           this.presentToast(res.message);
        }else{
           this.skeleton = false; 
           this.presentToast(res.message);
        }
      }).catch( err => {  });
    }else{
        this.presentToast("Please enter valid Input!");
    }
  }


  countLength(){
    this.searchKeyword2 = this.searchKeyword;
    // console.log(this.searchKeyword2);
  }


  searchBoxClear(){
    this.searchResult_Data = null;
   console.log(this.searchResult_Data);
  }


  doInfinite(event) {
    console.log(event);
    setTimeout(() => {
      this.numOfData += 10;
      event.target.complete(); 
    }, 2000); 
  }


  goto_productDetails(prod_id){
    console.log('Go to Product detail page  ' + prod_id);
     this.router.navigate(['/product-details'],{ queryParams : {"product_id": prod_id, "type": 'search_product'} });
  }




  async sortClick(){
    const modal = await this.modalCtrl.create({
      component: SortPage,
      // componentProps: {'firstName': 'Douglas'},
      animated: true,
      backdropDismiss:false,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4, 0.8]
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
      initialBreakpoint: 0.6,
      breakpoints: [0, 0.6, 1]
      });
      return await modal.present();
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
