import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsOfSalesPageRoutingModule } from './terms-of-sales-routing.module';

import { TermsOfSalesPage } from './terms-of-sales.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsOfSalesPageRoutingModule
  ],
  declarations: [TermsOfSalesPage, BkBtnComponent]
})
export class TermsOfSalesPageModule {}
