import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayResultPage } from './pay-result.page';

const routes: Routes = [
  {
    path: '',
    component: PayResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayResultPageRoutingModule {}
