import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDPage } from './home-d.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDPageRoutingModule {}
