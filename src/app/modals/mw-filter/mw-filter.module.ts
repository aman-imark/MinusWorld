import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MwFilterPageRoutingModule } from './mw-filter-routing.module';

import { MwFilterPage } from './mw-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MwFilterPageRoutingModule
  ],
  declarations: [MwFilterPage]
})
export class MwFilterPageModule {}
