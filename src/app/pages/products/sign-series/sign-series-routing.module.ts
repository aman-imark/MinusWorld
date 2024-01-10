import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignSeriesPage } from './sign-series.page';

const routes: Routes = [
  {
    path: '',
    component: SignSeriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignSeriesPageRoutingModule {}
