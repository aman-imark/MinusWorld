import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerOffersPage } from './buyer-offers.page';

const routes: Routes = [
  {
    path: '',
    component: BuyerOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerOffersPageRoutingModule {}
