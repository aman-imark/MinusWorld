import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignSeriesPageRoutingModule } from './sign-series-routing.module';

import { SignSeriesPage } from './sign-series.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignSeriesPageRoutingModule
  ],
  declarations: [SignSeriesPage, BkBtnComponent]
})
export class SignSeriesPageModule {}
