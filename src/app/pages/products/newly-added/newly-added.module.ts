import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlyAddedPageRoutingModule } from './newly-added-routing.module';

import { NewlyAddedPage } from './newly-added.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlyAddedPageRoutingModule
  ],
  declarations: [NewlyAddedPage, BkBtnComponent]
})
export class NewlyAddedPageModule {}
