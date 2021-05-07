import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuestionarioEPage } from './cuestionario-e.page';

const routes: Routes = [
  {
    path: '',
    component: CuestionarioEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuestionarioEPageRoutingModule {}
