import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerProductsPageRoutingModule } from './seller-products-routing.module';

import { SellerProductsPage } from './seller-products.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerProductsPageRoutingModule
  ],
  declarations: [SellerProductsPage, BkBtnComponent]
})
export class SellerProductsPageModule {}
