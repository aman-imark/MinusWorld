import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MwstoreDetailsPage } from './mwstore-details.page';

const routes: Routes = [
  {
    path: '',
    component: MwstoreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MwstoreDetailsPageRoutingModule {}
