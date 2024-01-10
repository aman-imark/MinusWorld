import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayMethodPageRoutingModule } from './pay-method-routing.module';

import { PayMethodPage } from './pay-method.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

import { PaypalComponent } from '../../../components/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PayMethodPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [PayMethodPage, BkBtnComponent, PaypalComponent]
})
export class PayMethodPageModule {}
