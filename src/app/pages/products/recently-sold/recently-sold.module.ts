import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentlySoldPageRoutingModule } from './recently-sold-routing.module';

import { RecentlySoldPage } from './recently-sold.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentlySoldPageRoutingModule
  ],
  declarations: [RecentlySoldPage, BkBtnComponent]
})
export class RecentlySoldPageModule {}
