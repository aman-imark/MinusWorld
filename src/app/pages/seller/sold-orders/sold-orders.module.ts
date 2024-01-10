import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoldOrdersPageRoutingModule } from './sold-orders-routing.module';

import { SoldOrdersPage } from './sold-orders.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoldOrdersPageRoutingModule
  ],
  declarations: [SoldOrdersPage, BkBtnComponent]
})
export class SoldOrdersPageModule {}
