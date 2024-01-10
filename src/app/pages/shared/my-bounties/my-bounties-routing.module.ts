import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBountiesPage } from './my-bounties.page';

const routes: Routes = [
  {
    path: '',
    component: MyBountiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBountiesPageRoutingModule {}
