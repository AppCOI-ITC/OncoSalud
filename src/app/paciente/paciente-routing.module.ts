import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { CuestionarioEComponent } from './cuestionario-e/cuestionario-e.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';

import { PacientePage } from './paciente.page';

const routes: Routes = [
  {
    path: '',
    component: PacientePage
  },
  {
    path: 'cuestionario-e',
    component: CuestionarioEComponent
  },
  {
    path: 'cuestionario',
    component: CuestionarioComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientePageRoutingModule {}
