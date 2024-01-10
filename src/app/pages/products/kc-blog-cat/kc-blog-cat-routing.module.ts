import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KcBlogCatPage } from './kc-blog-cat.page';

const routes: Routes = [
  {
    path: '',
    component: KcBlogCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KcBlogCatPageRoutingModule {}
