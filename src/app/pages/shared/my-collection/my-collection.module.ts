import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCollectionPageRoutingModule } from './my-collection-routing.module';

import { MyCollectionPage } from './my-collection.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCollectionPageRoutingModule
  ],
  declarations: [MyCollectionPage, BkBtnComponent]
})
export class MyCollectionPageModule {}
