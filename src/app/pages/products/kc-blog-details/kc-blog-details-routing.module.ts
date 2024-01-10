import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KcBlogDetailsPage } from './kc-blog-details.page';

const routes: Routes = [
  {
    path: '',
    component: KcBlogDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KcBlogDetailsPageRoutingModule {}
