import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedGamesPageRoutingModule } from './featured-games-routing.module';

import { FeaturedGamesPage } from './featured-games.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedGamesPageRoutingModule
  ],
  declarations: [FeaturedGamesPage, BkBtnComponent]
})
export class FeaturedGamesPageModule {}
