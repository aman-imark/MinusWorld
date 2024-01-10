import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../../../services/config.service';
import { SessionService } from '../../../services/session.service';

import { ToastController, Platform } from '@ionic/angular';
import { Location } from "@angular/common";

import { Share } from '@capacitor/share';


@Component({
  selector: 'app-kc-blog-details',
  templateUrl: './kc-blog-details.page.html',
  styleUrls: ['./kc-blog-details.page.scss'],
})
export class KcBlogDetailsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  isLoggedIn: boolean;
  userData: any;
    user_token: any;
    user_role: any;
    user_email: any
    user_id: any;

    kc_BlogDetails : any;
    kc_RelatedBlog : any;

    kc_videoUrl: any;

    pdfURL: boolean = false;
    youTubeURL: boolean = false;


    // src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // src = 'https://dev1.minusworlds.com/uploads/599859925_8.gameboy-advance-launch-titles-1.pdf';
      src = "assets/test1.pdf"
    
      constructor(public toastCtrl: ToastController,private location: Location, public alertController: AlertController, 
              public configServ: ConfigService, public checkStr: SessionService, private router: Router, 
              public activatedRoute : ActivatedRoute, public element: ElementRef, private sanitizer: DomSanitizer,
              public renderer: Renderer2, private platform: Platform) { }



    ionViewWillEnter(){
      this.checkLogin();
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.KCenter_BlogDetails_Data(res.kc_blg_id);
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
          }else{ this.isLoggedIn = false; }
        }else{ this.isLoggedIn = false; }
      }).catch( err => {
        this.isLoggedIn = false;
      });
    }

  

    KCenter_BlogDetails_Data(kc_blg_id){
      this.configServ.postData('/blog_details.php', {"id": kc_blg_id}).then((res:any) => {  // console.log(res);
        console.log(res);
        if(res.status === 'success'){
          this.kc_BlogDetails = res.BlogDetails;
          this.kc_RelatedBlog = res.RelatedBlog;
           this.pdfURL = this.get_url_extension(res.BlogDetails.blog_content);
           this.youTubeURL = this.matchYoutubeUrl(res.BlogDetails.blog_content);
           this.kc_videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.BlogDetails.blog_content);
        }else{
          this.presentToast(res.message);
        }
      }).catch( err => {
      });
    }


    matchYoutubeUrl(url){
       if (url) {
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(regExp)) {
            return true;
        }
      }
      return false;
    }

    get_url_extension( url ) {
      // return /\.(jpg|jpeg|png|pdf)$/.test(url);
      return /\.(pdf)$/.test(url);
    }


  async kc_blogDetails_Share(){
      await Share.share({
        title: 'Welcome to Minus Worlds! ',
        text: 'Really awesome! Your one-stop shop for rare games and knowledge!',
        url: 'https://minusworlds.com/',
        dialogTitle: 'Share with your friends',
      });
  }


  goto_blogDetails(blog_id){
    this.configServ.show();
    setTimeout( () => {
      this.configServ.hide();
    }, 500)
    this.router.navigate(['/kc-blog-details'],{ queryParams : {"kc_blg_id": blog_id} });
    this.content.scrollToTop(1000);
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
  }

}
