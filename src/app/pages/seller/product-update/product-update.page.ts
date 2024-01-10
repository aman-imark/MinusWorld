import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { IonContent,ToastController } from '@ionic/angular';
import { Location } from "@angular/common";

import { Camera, GalleryImageOptions, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';


import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

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

     
     edit_productId: any;
     edit_prdSetD: any;
     prod_updated: boolean = false;
     prd_updateForm : FormGroup;


  constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
      private domSanitizer: DomSanitizer,public configServ: ConfigService, public checkStr: SessionService, 
      private router: Router,  public activatedRoute : ActivatedRoute, public element: ElementRef, 
      public renderer: Renderer2, private fb: FormBuilder) { }
  

    ngOnInit(){
      // this.prd_updateForm = new FormGroup({
      //   userid: new FormControl(''),
      //   console: new FormControl(''),
      //   prod_typ: new FormControl(''),
      //   video_game_typ: new FormControl(''),        
      //   prodname: new FormControl(''),
      //   game_developer: new FormControl(''),
      //   yearofrelease: new FormControl(''),
      //   certification_number: new FormControl(''),
      //   grade: new FormControl(''),
      //   variant: new FormControl(''),
      //   allow_offers: new FormControl(''),
      //   desc: new FormControl(''),
      //   vga_grade: new FormControl(''),
      //   box_grade: new FormControl(''),
      //   seal_grade: new FormControl(''),
      //   net_price: new FormControl(''),
      //   min_offer: new FormControl(''),
      //   status: new FormControl(''),
      //   disclaimers_check: new FormControl(''),
      //   feature: new FormControl(''),
      //   thumbnail_img: new FormControl(''),
      //   other_imgs: new FormControl(''),
      // });



      
      this.prd_updateForm = this.fb.group({
        userid: ['', [Validators.required]],
        console: ['', [Validators.required]],
        prod_typ: ['', [Validators.required]],
        video_game_typ: ['', [Validators.required]],     
        prodname: ['', [Validators.required]],
        game_developer: [''],
        yearofrelease: [''],
        certification_number: ['', [Validators.required]],
        grade: ['', [Validators.required]],
        variant: [''],
        allow_offers: ['', [Validators.required]],
        desc: [''],
        vga_grade: [''],
        box_grade: [''],
        seal_grade: [''],
        net_price: ['', [Validators.required]],
        min_offer: ['', [Validators.required]],
        status: [''],
        disclaimers_check: [''],
        feature: [''],
        thumbnail_img: [[], [Validators.required]],
        other_imgs: [[], [Validators.required]],
      });
//  console.log(this.prd_updateForm);
    }




    
    ionViewWillEnter(){
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
      this.checkLogin();
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.edit_productId = res.product_id;
       });
     
    }
  



    checkLogin(){
      this.checkStr.getStore('user_dataMW').then((data:any) => { 
        console.log(data);
        if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
          if(this.userData.email){
             this.isLoggedIn = true;
             this.user_id = this.userData.userid;
             this.get_ProductsDetails(this.edit_productId, this.user_id);
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



    // this.checkStr.getStore('user_dataMW').then((data:any) => { 
    //   console.log(data);
    //   if(data != null || data != '' || typeof(data) != 'undefined'){
    //     this.userData = data;
    //     if(this.userData.email){
    //       this.isLoggedIn = true;
    //       this.user_id = this.userData.userid;
    //       this.user_img = this.userData.user_img;
    //       this.checkMyCart();
    //     }else{ this.isLoggedIn = false; }
    //   }else{ this.isLoggedIn = false; }
    // },(reason) => {
    //     this.isLoggedIn = false;
    // }
    // ).catch( err => {
    //     this.isLoggedIn = false;
    // });





  get_ProductsDetails(prod_id, uid){
    this.configServ.postData('/editproductdetails.php', {"userid": uid,"prodid": prod_id}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
         this.edit_prdSetD = res.YourProduct;
           this.prd_updateForm.controls['console'].setValue(res.YourProduct.console);
           this.prd_updateForm.controls['prod_typ'].setValue(res.YourProduct.prod_typ);
           this.prd_updateForm.controls['video_game_typ'].setValue(res.YourProduct.video_game_typ);
           this.prd_updateForm.controls['prodname'].setValue(res.YourProduct.prodname);
           this.prd_updateForm.controls['game_developer'].setValue(res.YourProduct.game_developer);
           this.prd_updateForm.controls['yearofrelease'].setValue(res.YourProduct.yearofrelease);
           this.prd_updateForm.controls['certification_number'].setValue(res.YourProduct.certification_number);
           this.prd_updateForm.controls['grade'].setValue(res.YourProduct.grade);
           this.prd_updateForm.controls['variant'].setValue(res.YourProduct.variant);
           this.prd_updateForm.controls['allow_offers'].setValue(res.YourProduct.allow_offers);
           this.prd_updateForm.controls['desc'].setValue(res.YourProduct.desc);
           this.prd_updateForm.controls['vga_grade'].setValue(res.YourProduct.vga_grade);
           this.prd_updateForm.controls['box_grade'].setValue(res.YourProduct.box_grade);
           this.prd_updateForm.controls['seal_grade'].setValue(res.YourProduct.seal_grade);
           this.prd_updateForm.controls['net_price'].setValue(res.YourProduct.net_price);
           this.prd_updateForm.controls['min_offer'].setValue(res.YourProduct.min_offer);

           this.prd_updateForm.controls['feature'].setValue('');
           this.prd_updateForm.controls['status'].setValue('1');

           this.prd_updateForm.controls['disclaimers_check'].setValue(res.YourProduct.disclaimers_check);
       
           this.thumb_imageData = res.YourProduct.thumbnail_img;
           this.other_imageData = res.YourProduct.other_imgs;
           
            if(res.YourProduct.thumbnail_img.length >= 1){
              this.enableThumbs_img = true;
            }else{
              this.enableThumbs_img = false;
            }
            

            if(res.YourProduct.other_imgs.length >= 1){
              this.enableOthers_img = true;
            }else{
              this.enableOthers_img = false;
            }
           



      //   this.content.scrollToTop(500);
      //   this.ProductData = res.ProductDetails;
      //   this.ProductData_thumb = res.ProductDetails.thumbnail_img;
      //   this.Product_relatedData= res.RelatedProducts;
      }else{
        this.presentToast('Edit product details not found!')
      }
    }).catch( err => {
    });

    // {
    //   "status": "success",
    //   "message": "Product Details",
    //   "YourProduct": {
    //       "console": "4",
    //       "prod_typ": "3",
    //       "video_game_typ": "6",
    //       "prodname": "Deb Test P",
    //       "game_developer": "3",
    //       "yearofrelease": "2022",
    //       "certification_number": "56234652465476",
    //       "grade": "2",
    //       "variant": "26",
    //       "allow_offers": "2",
    //       "desc": "",
    //       "vga_grade": "6",
    //       "box_grade": "0",
    //       "seal_grade": "0",
    //       "net_price": "2000",
    //       "min_offer": "0",
    //       "disclaimers_check": [
    //           "[1",
    //           "6",
    //           "9",
    //           "11]"
    //       ],
    //       "thumbnail_img": [
    //           "https://evolvethought.com/minusworlds/uploads/628b7880c918e,"
    //       ],
    //       "other_imgs": [
    //           "https://evolvethought.com/minusworlds/uploads/628b7880c9486,"
    //       ]
    //   }
    // }
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

      // this.disclosersData.forEach(object => {
      //   object.selected = false;
      // });

      // document.getElementById("checkbox").checked = true;

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
  // this.us = this.selectedDisclosers
  // this.prd_updateForm.controls['disclaimers_check'].setValue(res.YourProduct.disclaimers_check);
}







// ******************* multipal image upload part  *******************

sanitizeImageUrl(imageUrl: string): SafeUrl {
  return this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
}


productThumbs_imgSelectClick(){
  // this.configServ.show();
  // FilePicker.pickFiles({
  //      types: ['image/png'],
  //      multiple: true,
  //      readData: true
  // }).then((resa) => {
  //   //  this.configServ.hide();
  //    var images = resa.files;
  //    for(var i=0; i<images.length; i++){
  //      this.thumb_imageData.push('data:'+images[i].mimeType+';base64,'+images[i].data);
  //    }
  //    if(this.thumb_imageData.length >= 1){
  //        this.enableThumbs_img = true;
  //    }else{
  //        this.enableThumbs_img = false;
  //    }
  //    console.log(this.thumb_imageData); 
  // })

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




// productThumbs_imgSelectClick(){
//   // this.configServ.show();
//   FilePicker.pickFiles({
//        types: ['image/png'],
//        multiple: true,
//        readData: true
//   }).then((resa) => {
//     //  this.configServ.hide();
//      var images = resa.files;
//      for(var i=0; i<images.length; i++){
//        this.thumb_imageData.push('data:'+images[i].mimeType+';base64,'+images[i].data);
//      }
//      if(this.thumb_imageData.length >= 1){
//          this.enableThumbs_img = true;
//      }else{
//          this.enableThumbs_img = false;
//      }
//      console.log(this.thumb_imageData); 
//   })
//   // Camera.pickImages({
//   //   quality: 90,
//   //   correctOrientation : true,
//   //   limit: 5,
//   // }).then((resa) => {
//   //    this.configServ.hide();
//   //    console.log(resa);
//   //    var images = resa.photos;
//   //    this.thumb_imageData = [];
//   //    for(var i=0; i<images.length; i++){
//   //      this.thumb_imageData.push(images[i].webPath);
//   //    }
//   //    if(this.thumb_imageData.length >= 1){
//   //        this.enableThumbs_img = true;
//   //    }else{
//   //        this.enableThumbs_img = false;
//   //    }
//   // })
//  }

// removeThumb_imgData(rm_img){
//   // console.log(rm_img);
//   this.thumb_imageData = this.thumb_imageData.filter(e => e !== rm_img);
//   console.log(this.thumb_imageData);
//   if(this.thumb_imageData.length >= 1){
//     this.enableThumbs_img = true;
//   }else{
//     this.enableThumbs_img = false;
//   }
// }







productOther_imgSelectClick(){
  // this.configServ.show()
  // FilePicker.pickFiles({
  //      types: ['image/png'],
  //      multiple: true,
  //      readData: true
  // }).then((resb) => {
  //   //  this.configServ.hide();
  //    var images = resb.files;
  //    for(var i=0; i<images.length; i++){
  //      this.other_imageData.push('data:'+images[i].mimeType+';base64,'+images[i].data);
  //    }
  //    if(this.other_imageData.length >= 1){
  //        this.enableOthers_img = true;
  //    }else{
  //        this.enableOthers_img = false;
  //    }
  //    console.log(this.other_imageData); 
  // })


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
//   "feature":"The Gametype is required"
// }}

// ******************* product update section start ********************



productUpdate_formData(form: FormGroup){
  this.prd_updateForm.controls['userid'].setValue(this.user_id);
  this.prd_updateForm.controls['thumbnail_img'].setValue(this.thumb_imageData);
  this.prd_updateForm.controls['other_imgs'].setValue(this.other_imageData);
  console.table(form.value);
  console.table(this.prd_updateForm.value);
  console.log(this.prd_updateForm);
  if(form.status === 'INVALID'){
    this.content.scrollToTop(2000);
  }else if(form.status === 'VALID'){
    this.configServ.show();
    this.configServ.postFormData('/editproduct.php', this.prd_updateForm.value).then((res:any) => {  // console.log(res);
        console.log(res);
        this.configServ.hide();
        if(res.status === "unauthorized"){
            this.presentToast(res.message);
        }else if(res.status === "success"){
            this.prod_updated = true;
            this.presentToast(res.message);
            // this.navCtrl.navigateBack(['/maintabs/tabs/tab5'])
        }else if(res.status === "required"){
              this.presentToast('Please fill all required fields!');
        }else if(res.status === "invalid"){
            this.presentToast(res.message);
        }else{
             this.presentToast('Unknown error at server side!');
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


}
