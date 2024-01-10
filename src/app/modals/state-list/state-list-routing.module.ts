import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateListPage } from './state-list.page';

const routes: Routes = [
  {
    path: '',
    component: StateListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateListPageRoutingModule {}
