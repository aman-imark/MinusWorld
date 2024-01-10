import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedGamesPage } from './featured-games.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedGamesPageRoutingModule {}
