import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsOfSalesPage } from './terms-of-sales.page';

const routes: Routes = [
  {
    path: '',
    component: TermsOfSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsOfSalesPageRoutingModule {}
