import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StateListPageRoutingModule } from './state-list-routing.module';

import { StateListPage } from './state-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateListPageRoutingModule
  ],
  declarations: [StateListPage]
})
export class StateListPageModule {}
