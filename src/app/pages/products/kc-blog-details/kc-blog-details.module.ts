import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KcBlogDetailsPageRoutingModule } from './kc-blog-details-routing.module';

import { KcBlogDetailsPage } from './kc-blog-details.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

import { PdfViewerModule } from 'ng2-pdf-viewer'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KcBlogDetailsPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [KcBlogDetailsPage, BkBtnComponent]
})
export class KcBlogDetailsPageModule {}
