import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { SideHeaderComponent } from '../../components/side-header/side-header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]),
    Tab5PageRoutingModule,
  ],
  declarations: [Tab5Page, SideHeaderComponent]
})
export class Tab5PageModule {}
