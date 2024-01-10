import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductUpdatePageRoutingModule } from './product-update-routing.module';

import { ProductUpdatePage } from './product-update.page';

import { EditorModule } from '@tinymce/tinymce-angular';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductUpdatePageRoutingModule,
    EditorModule
  ],
  declarations: [ProductUpdatePage, BkBtnComponent]
})
export class ProductUpdatePageModule {}
