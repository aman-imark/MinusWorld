import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MwFilterPage } from './mw-filter.page';

const routes: Routes = [
  {
    path: '',
    component: MwFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MwFilterPageRoutingModule {}
