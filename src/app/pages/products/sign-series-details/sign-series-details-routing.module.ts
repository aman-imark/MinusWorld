import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignSeriesDetailsPage } from './sign-series-details.page';

const routes: Routes = [
  {
    path: '',
    component: SignSeriesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignSeriesDetailsPageRoutingModule {}
