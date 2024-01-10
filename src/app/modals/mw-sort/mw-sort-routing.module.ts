import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MwSortPage } from './mw-sort.page';

const routes: Routes = [
  {
    path: '',
    component: MwSortPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MwSortPageRoutingModule {}
