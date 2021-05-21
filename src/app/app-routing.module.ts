import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthGuardL1 } from './shared/authl1.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then( m => m.PacientePageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'medico',
    loadChildren: () => import('./medico/medico.module').then( m => m.MedicoPageModule),
    canLoad:[AuthGuardL1]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
