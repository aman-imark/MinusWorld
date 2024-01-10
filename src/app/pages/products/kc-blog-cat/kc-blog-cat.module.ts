import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KcBlogCatPageRoutingModule } from './kc-blog-cat-routing.module';

import { KcBlogCatPage } from './kc-blog-cat.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KcBlogCatPageRoutingModule
  ],
  declarations: [KcBlogCatPage, BkBtnComponent]
})
export class KcBlogCatPageModule {}
