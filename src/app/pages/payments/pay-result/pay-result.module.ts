import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayResultPageRoutingModule } from './pay-result-routing.module';

import { PayResultPage } from './pay-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayResultPageRoutingModule
  ],
  declarations: [PayResultPage]
})
export class PayResultPageModule {}
