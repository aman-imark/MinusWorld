import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BecomeAnSellerPageRoutingModule } from './become-an-seller-routing.module';

import { BecomeAnSellerPage } from './become-an-seller.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BecomeAnSellerPageRoutingModule
  ],
  declarations: [BecomeAnSellerPage, BkBtnComponent]
})
export class BecomeAnSellerPageModule {}
