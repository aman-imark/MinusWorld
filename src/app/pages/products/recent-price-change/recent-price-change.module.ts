import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPriceChangePageRoutingModule } from './recent-price-change-routing.module';

import { RecentPriceChangePage } from './recent-price-change.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPriceChangePageRoutingModule
  ],
  declarations: [RecentPriceChangePage, BkBtnComponent]
})
export class RecentPriceChangePageModule {}
