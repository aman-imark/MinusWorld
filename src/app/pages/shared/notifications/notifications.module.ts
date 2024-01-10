import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';


import { NotiresPipe } from '../../../services/notires.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule
  ],
  declarations: [NotificationsPage, BkBtnComponent, NotiresPipe]
})
export class NotificationsPageModule {}
