import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentPriceChangePage } from './recent-price-change.page';

const routes: Routes = [
  {
    path: '',
    component: RecentPriceChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentPriceChangePageRoutingModule {}
