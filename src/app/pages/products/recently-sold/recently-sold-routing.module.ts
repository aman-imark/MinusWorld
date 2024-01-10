import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlySoldPage } from './recently-sold.page';

const routes: Routes = [
  {
    path: '',
    component: RecentlySoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentlySoldPageRoutingModule {}
