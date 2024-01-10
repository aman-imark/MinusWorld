import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MwSortPageRoutingModule } from './mw-sort-routing.module';

import { MwSortPage } from './mw-sort.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MwSortPageRoutingModule
  ],
  declarations: [MwSortPage]
})
export class MwSortPageModule {}
