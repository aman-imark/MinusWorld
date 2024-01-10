import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MwstoreDetailsPageRoutingModule } from './mwstore-details-routing.module';

import { MwstoreDetailsPage } from './mwstore-details.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MwstoreDetailsPageRoutingModule
  ],
  declarations: [MwstoreDetailsPage, BkBtnComponent]
})
export class MwstoreDetailsPageModule {}
