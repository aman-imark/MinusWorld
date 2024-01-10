import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerOffersPageRoutingModule } from './buyer-offers-routing.module';

import { BuyerOffersPage } from './buyer-offers.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyerOffersPageRoutingModule
  ],
  declarations: [BuyerOffersPage, BkBtnComponent]
})
export class BuyerOffersPageModule {}
