import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController, Platform, ToastController, AlertController, ActionSheetController } from '@ionic/angular';

import { ConfigService } from '../../services/config.service';
import { SessionService } from '../../services/session.service';
import { EventService } from '../../services/event.service';
import { PushnotiService } from '../../services/pushnoti.service';

import { ScrollDetail } from '@ionic/core';
import { Location } from "@angular/common";

// import { Camera, GalleryImageOptions ,CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';

import { ImgUploadPage } from '../../modals/img-upload/img-upload.page';

import { MenuController, LoadingController } from '@ionic/angular';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit {
  @ViewChild("toolbar") toolbar: HTMLElement;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_id: any;
    first_name: any;
    last_name: any;
    user_email: any
    user_img: any;
    user_phn: any;
    user_type: any;
    user_role: any;

// {
//   "userid": "9",
//   "first_name": "Debasis",
//   "last_name": "Satpathy",
//   "email": "debasis@thoughtmedia.com",
//   "user_img": "https://minusworlds.com/uploads/2104177671_1.jpg",
//   "phn": "1234567890",
//   "user_type": "2",
//   "user_role": "Seller"
// }



  
  u_firstname: any;
  u_lastname: any;
  u_email: any;
  u_phone: any;

  post_userData: any;
  get_userData: any;
  update_userData: any;

  upd_getData: any;
  update_storageData: any;

  showToolbar = false;
  edit_enable = false;


  base64: string = "";

  update_nativeStorage: any;

  constructor(public alertController: AlertController, private router: Router, public toastCtrl: ToastController, 
              public acSheetCtrl: ActionSheetController, public configServ: ConfigService, public checkStr: SessionService, 
              private location: Location,  public modalCtrl: ModalController, private menu: MenuController,
              public eventServ: EventService, public pushNoti: PushnotiService, private camera: Camera,
              private navCtrl: NavController) 
              {}
              // {  this.eventPublish() }




  ionViewWillEnter(){
    this.checkLogin();
    // // setTimeout(() => {
    // //   this.content.scrollToTop(400);
    // //  }, 200);
  }
            


  checkLogin(){
    this.checkStr.getStore('user_dataMW').then((data:any) => { 
      // console.log(data);

      if(data != null || data != '' || typeof(data) != 'undefined'){
        this.userData = data;
        if(this.userData.email){
          this.isLoggedIn = true;
          this.user_id = this.userData.userid;
          this.user_img = this.userData.user_img;
          this.get_UserProfile_Data(this.user_id);
        }else{ this.isLoggedIn = false; }
      }else{ this.isLoggedIn = false; }
    },(reason) => {
        this.isLoggedIn = false;
        this.navCtrl.navigateBack('/login');
      }
    ).catch( err => {
        this.isLoggedIn = false;
        this.navCtrl.navigateBack('/login');
    });
  }






  get_UserProfile_Data(uid){
    this.post_userData = {"userid": uid};
    this.configServ.postData('/profile.php', this.post_userData).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.get_userData = res.user;
        this.u_firstname = this.get_userData.first_name;
        this.u_lastname = this.get_userData.last_name;
        this.u_email = this.get_userData.email;
        this.u_phone = this.get_userData.phn;
      }else{
        // this.recentlySold_Data = null;
      }
    }).catch( err => {
    });
  }



  async update_UserProfile_Data(formData){
    // console.log(formData.value);
    this.configServ.postFormData('/editprofile.php', formData.value).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
          this.eventServ.publish(res.user);
          this.checkStr.setStore('user_dataMW', res.user);
          this.presentToast(res.message);
          this.edit_enable = false; 
          this.checkLogin();


      }else if(res.status === 'required'){
        if(res.message.first_name && res.message.last_name  && res.message.email && res.message.phone){
          this.presentToast(res.message.first_name);
        }else if(res.message.first_name){
          this.presentToast(res.message.first_name);
        }else if(res.message.last_name){
          this.presentToast(res.message.last_name);
        }else if(res.message.email){
          this.presentToast(res.message.email);
        }else if(res.message.phone){
          this.presentToast(res.message.phone);
        }else{
          this.presentToast('Unsuccessfull. Try again!');
        }
      }else if(res.status === "unauthorized"){
        this.presentToast(res.message);
      }else if(res.status === "failed"){
        this.presentToast(res.message);
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
      this.presentToast('Error: CORS issue');
    });
  }




  edit_enableClick(){
    this.edit_enable = true;
  }

  close_enableClick(){
    this.edit_enable = false;
  }



  async profilePic_changeClick(){
      const actionSheet = await this.acSheetCtrl.create({
        header: 'Update Profile Image',
        cssClass: 'custom-sheet',
        mode: 'md',
        buttons: [{
          text: 'Select from gallery',
          icon: 'images-outline',
          handler: () => { 
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Use camera',
          icon: 'camera-outline',
          handler: () => { 
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{ 
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }]
      });
      await actionSheet.present();
  
      const { role, data } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
  }



  takePicture(sourceType: any) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64 = base64Image;
         if(this.base64 != '' && this.base64 != null){
           this.open_imagePreviewModal(this.user_id, this.base64);
         }else{
           this.presentToast('Somthing wrong!');
         }
     }, (err) => {
        this.presentToast(err);
     });
  }




 async camera_enableClick(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.base64 = base64Image;
        if(this.base64 != '' && this.base64 != null){
          this.open_imagePreviewModal(this.user_id, this.base64);
        }else{
          this.presentToast('Somthing wrong!');
        }

    }, (err) => {
     // Handle error
    });


  }






async open_imagePreviewModal(uid, data){
  if(uid && data){
  this.configServ.show();
  const modal = await this.modalCtrl.create({
    component: ImgUploadPage,
    initialBreakpoint: 1,
    breakpoints: [0, 1],
    componentProps: {
      user_id: uid,
      imageData: data
    }
    });
    this.configServ.hide();

    modal.onDidDismiss().then((res) => {
      console.log(res)
      if(res.data === true){
        this.checkLogin();
      }
    });
    return await modal.present();
  }else{
    this.presentToast('somthing wrong! userid, imageData!')
  }
}






  async switch_toSeller_confirmation(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure want to become an Seller?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.user_madeSeller();
          }
        }
      ]
    });
    await alert.present();
  }

  user_madeSeller(){
    this.configServ.postData('/switchtoseller.php', {"userid" :this.user_id}).then((res:any) => {  // console.log(res);
      console.log(res);
      console.log(res.user.email)
      console.log(res.user.phn)
      if(res.status === 'success'){
        this.eventServ.publish(res.user);
        this.checkStr.setStore('user_dataMW', res.user);
        this.checkLogin();
        this.presentToast(res.message);
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }


  async switch_toBuyer_confirmation(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure want to become an Buyer?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.user_madeBuyer();
          }
        }
      ]
    });
    await alert.present();
  }



  user_madeBuyer(){
    this.configServ.postData('/switchtobuyer.php', {"userid" :this.user_id}).then((res:any) => {  // console.log(res);
      console.log(res);
      if(res.status === 'success'){
        this.eventServ.publish(res.user);
        this.checkStr.setStore('user_dataMW', res.user);
        this.checkLogin();
        this.presentToast(res.message);
      }else{
        this.presentToast(res.message);
      }
    }).catch( err => {
    });
  }






  async account_deleteConfirmation(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Are you sure want to delete your account?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          id: 'confirm-button',
          handler: () => {
            this.presentToast('Your account has been deleted successfully.');
            this.delete_account();
          }
        }
      ]
    });
    await alert.present();
  }


  delete_account() {
    this.router.navigate(['/']);
  };




  // subscribe to event 
  eventPublish(){
    this.eventServ.currentEvent.subscribe((data: any) => {
      // console.log(data);
      if(data){
        this.userData = data;
        this.isLoggedIn = true;
          this.first_name = this.userData.first_name;
          this.last_name = this.userData.last_name;
          this.user_email = this.userData.email;
          this.user_img = this.userData.user_img;
          this.user_phn = this.userData.phn;
          this.user_type = this.userData.user_type;
          this.user_role = this.userData.user_role;

          if(data.user_type == '1') {                 
             this.menu.enable(false, 'guest');
             this.menu.enable(false, 'seller');
             this.menu.enable(true, 'buyer');
          } else if(data.user_type == '2') {
             this.menu.enable(false, 'guest');
             this.menu.enable(false, 'buyer');
             this.menu.enable(true, 'seller');
          }
      }else{ }
      //  console.log('user#:   '+ this.user_role +'   '+ this.isLoggedIn);    
    }); 
}






  goto_change_user_password(){
    this.router.navigate(['/change-password']);
  }



  goto_seller_myProducts(){
    this.router.navigate(['/seller-products']);
  }

  goto_seller_soldOrders(){
    this.router.navigate(['/sold-orders']);
  }


  goto_myCollection(){
    this.router.navigate(['/my-collection']);
  }

  goto_myOrders(){
    this.router.navigate(['/user-orders']);
  }


  myBackButton(){
    this.location.back();
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
    // Camera.requestPermissions({permissions:['photos']})
  }

}
