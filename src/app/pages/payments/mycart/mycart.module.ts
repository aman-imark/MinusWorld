import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycartPageRoutingModule } from './mycart-routing.module';

import { MycartPage } from './mycart.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycartPageRoutingModule,
  ],
  declarations: [MycartPage, BkBtnComponent]
})
export class MycartPageModule {}
