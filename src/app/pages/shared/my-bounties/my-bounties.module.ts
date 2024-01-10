import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBountiesPageRoutingModule } from './my-bounties-routing.module';

import { MyBountiesPage } from './my-bounties.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBountiesPageRoutingModule
  ],
  declarations: [MyBountiesPage, BkBtnComponent]
})
export class MyBountiesPageModule {}
