import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { IonContent, ToastController } from '@ionic/angular';
import { Location } from "@angular/common";

import { Camera, GalleryImageOptions, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';


import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { UserProduct } from '../../../services/user';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild("header") header: HTMLElement;
  
  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    consoleData: any;
    productTypeData: any;
    videoGameTypeData: any;
    gameDeveloperData: any;
      gradeTypeData: any;
      vgaGradeType_Data: any;
      boxGradeTypeData: any;
      sealGradeTypeData: any;
    variantsData: any;

    disclosersData: any;
    selectedDisclosers: any = [];
  
    grade_Conditional: boolean = false;

    enableThumbs_img = false;
     thumb_imageData: any = [];

    enableOthers_img = false;
     other_imageData: any = [];

     
     product_message: any;
     
     prod_added: boolean = false;
     userModal = new UserProduct();


  constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
      private domSanitizer: DomSanitizer,public configServ: ConfigService, public checkStr: SessionService, 
      private router: Router,  public activatedRoute : ActivatedRoute, public element: ElementRef, 
      public renderer: Renderer2, private navCtrl : NavController) { }
      // private imagePicker: ImagePicker



    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
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
             
             this.getConsole_Data();
             this.getProductType_Data();
             this.getVideoGameType_Data();
             this.getGameDev_Data();
               this.getGrade_Data();
               this.getVGA_GradeScale_Data();
               this.getBoxGradeRange_Data();
               this.getSealGradeRange_Data();
             this.getVariants_Data();
             this.getBottom_disclosers_Data();

          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }




  getConsole_Data(){
      this.configServ.postData('/console.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
        if(res.status === 'success'){
          this.consoleData = res.console_details;
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
  }




  getProductType_Data(){
    this.configServ.getData('/prodtype.php').then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.productTypeData = res.prod_details;
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }




  getVideoGameType_Data(){
    this.configServ.postData('/videogametype.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.videoGameTypeData = res.video_game_details;
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }


  getGameDev_Data(){
    this.configServ.getData('/gamedeveloper.php').then((res:any) => {  console.log(res);
      if(res.status === 'success'){
        this.gameDeveloperData = res.game_developer_details;
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
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }



  // vga grade range
  getVGA_GradeScale_Data(){
    this.configServ.postData('/vgagrade.php', {"showcount":"gamesforsale"}).then((res:any) => { // console.log(res);
      if(res.status === 'success'){
        this.vgaGradeType_Data = res.VGAgradedetails;
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
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }





  getVariants_Data(){
    this.configServ.postData('/variants.php', {"showcount":"gamesforsale"}).then((res:any) => {  console.log(res);
      if(res.status === 'success'){
        this.variantsData = res.variants_details;
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }





  getBottom_disclosers_Data(){
    this.configServ.getData('/disclosers.php').then((res:any) => {  console.log(res);
      if(res.status === 'success'){
        this.disclosersData = res.disclosers_details;
        this.disclosersData.forEach(object => {
          object.selected = false;
        });
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }





  

  change_GradeValue(val){
    console.log(val);
    if(val == '2'){
      this.grade_Conditional = false;
    }else{
      this.grade_Conditional = true;
    }
  }



  selectDisclosers(checkbox: string, event){
    console.log(checkbox);
    console.log(event)
    if(event.detail.checked === true){
      this.selectedDisclosers.push(checkbox);
    }else if(event.detail.checked === false){
      this.selectedDisclosers = this.selectedDisclosers.filter(e => e !== event.detail.value)
    }
    console.log(this.selectedDisclosers);
    this.userModal.disclaimers_check = this.selectedDisclosers
  }







// ******************* multipal image upload part  *******************

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
  }


  productThumbs_imgSelectClick(){
    this.configServ.show();
    Camera.pickImages({
      quality: 90,
      correctOrientation : true,
      limit: 5,
    }).then(async(resa) => {
       this.configServ.hide();
      //  console.log(resa);
      for (let photo of resa.photos) {
        const file = await Filesystem.readFile({
           path: photo.path,
        });
        this.thumb_imageData.push('data:image/'+photo.format+';base64,'+file.data);
      }
      if(this.thumb_imageData.length >= 1){
           this.enableThumbs_img = true;
       }else{
           this.enableThumbs_img = false;
       }
    })
   }




  removeThumb_imgData(rm_img){
    // console.log(rm_img);
    this.thumb_imageData = this.thumb_imageData.filter(e => e !== rm_img);
    console.log(this.thumb_imageData);
    if(this.thumb_imageData.length >= 1){
      this.enableThumbs_img = true;
    }else{
      this.enableThumbs_img = false;
    }
  }






  productOther_imgSelectClick(){
    this.configServ.show();
    Camera.pickImages({
      quality: 90,
      correctOrientation : true,
      limit: 5,
      
    }).then(async (resb) => {
       this.configServ.hide();
       console.log(resb);

       for (let photo of resb.photos) {
         // console.log(photo)
         const file = await Filesystem.readFile({
            path: photo.path,
         });
         this.other_imageData.push('data:image/'+photo.format+';base64,'+file.data);
       }
       if(this.other_imageData.length >= 1){
         this.enableOthers_img = true;
       }else{
         this.enableOthers_img = false;
       }
    })
  }

  removeOther_imgData(rm_img){
    // console.log(rm_img);
    this.other_imageData = this.other_imageData.filter(e => e !== rm_img);
    console.log(this.other_imageData);
    if(this.other_imageData.length >= 1){
      this.enableOthers_img = true;
    }else{
      this.enableOthers_img = false;
    }
  }









  // {"status":"required","message":{
  //   "console":"The Console is required",
  //   "prod_typ":"The Prod typ is required",
  //   "video_game_typ":"The Video game typ is required",
  //   "prodname":"The Prodname is required",
  //   "certification_number":"The Certification number is required",
  //   "grade":"The Grade is required",
  //   "variant":"The Variant is required",
  //   "allow_offers":"The Allow offers is required",
  //   "gametype":"The Gametype is required"
  // }}

 // ******************* product add section start ********************





 sumbitAction(val){
   this.userModal.status = val;
 }

 
  productAdd_formData(form){
    this.userModal.thumbnail_img = this.thumb_imageData;
    this.userModal.other_imgs = this.other_imageData;
    if(form.status === 'INVALID'){
      this.content.scrollToTop(2000);
      console.table(this.userModal);
    }else if(form.status === 'VALID'){
      this.userModal.userid = this.user_id;
      this.userModal.gametype = this.userModal.video_game_typ;
      this.userModal.thumbnail_img = this.thumb_imageData;
      this.userModal.other_imgs = this.other_imageData;
      console.table(this.userModal);
      this.configServ.show();
      this.configServ.postFormData('/addProduct.php', this.userModal).then((res:any) => {  // console.log(res);
          console.log(res);
          this.configServ.hide();
          if(res.status === "unauthorized"){
              this.presentToast(res.message);
          }else if(res.status === "success"){
              this.prod_added = true;
              this.product_message = res.message;
              this.presentToast(res.message);
              setTimeout( () => {
                this.navCtrl.navigateBack(['/dashboard'])
              }, 2000);
          }else if(res.status === "required"){
                this.presentToast('Please fill all required fields!');
          }else if(res.status === "invalid"){
              this.presentToast(res.message);
          }else{
               this.presentToast(res.message);
          }
      }).catch( err => {
             this.presentToast(JSON.stringify(err.message));
      });
    }
  }



  countChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
    // event.target.value = event.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
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
