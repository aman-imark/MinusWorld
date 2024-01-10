import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BecomeAnSellerPage } from './become-an-seller.page';

const routes: Routes = [
  {
    path: '',
    component: BecomeAnSellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BecomeAnSellerPageRoutingModule {}
