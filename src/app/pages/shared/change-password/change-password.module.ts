import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';

import { BkBtnComponent } from '../../../components/bk-btn/bk-btn.component';

import { MatchPasswordDirective } from '../../../directives/match-password.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage, BkBtnComponent, MatchPasswordDirective]
})
export class ChangePasswordPageModule {}
