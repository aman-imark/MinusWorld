import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignSeriesDetailsPageRoutingModule } from './sign-series-details-routing.module';

import { SignSeriesDetailsPage } from './sign-series-details.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignSeriesDetailsPageRoutingModule
  ],
  declarations: [SignSeriesDetailsPage, BkBtnComponent]
})
export class SignSeriesDetailsPageModule {}
