import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// npm text editor
// https://www.tiny.cloud/docs/integrations/angular/
// $ npm install --save @tinymce/tinymce-angular   -- for cloud tiny editor
// $ npm uninstall --save tinymce
// npm uninstall @tinymce/tinymce-angular 
// npm install --save @tinymce/tinymce-angular 


// npm install @tinymce/tinymce-angular@^6.0.0
import { EditorModule } from '@tinymce/tinymce-angular';

//  cordova plugins
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';


// Angular HTTP
import { HttpClientModule } from '@angular/common/http';


import { SwiperModule } from 'swiper/angular';
// ovseravale event service
import { EventService } from './services/event.service';


import { NgxPayPalModule } from 'ngx-paypal';

import { DecimalPipe, formatNumber } from '@angular/common';

// Ionic Portals 
// KeyeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyOTM0MzI1In0.gSEc79E54dsPVK8xDeSTRL_yPvSzZKBwdA1mWo1JV5cLxUfLqKhSuXD0qi4xNLmWDXYyZCtNHUFMhZOYhtbJloUn447-KvRQoQOCWS3fB-97Qf70YeOTXP7ZxstqdnsUTFVzU97r70wZfWkcS08Ffcr4tlv9aPvuVHaoTP8k6kVv3NJRrDuT10RFhkhvxYDc9fybrJPaAh3Bbt6dN7aPZC4K1hM3mYyhJQ5pkovc_nyfbqnVAF0uqC9CPvdNjgN8mKTkfmt1ro3EQqg1hQqNJbjQ9kpxNmjX8oz86_D8yNuU9D2IEGtravORXVXGlRbiR3RJ27d6i5eUPM-cmkM6cQ
// https://dashboard.ionicframework.com/personal/portals-key


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule,
    AppRoutingModule, 
    EditorModule,
    NgxPayPalModule,
    SwiperModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
              Stripe, Camera, Device, EventService, DecimalPipe],
              
  bootstrap: [AppComponent],
})
export class AppModule {}
   