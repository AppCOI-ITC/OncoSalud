import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-d',
    loadChildren: () => import('./doctor/home-d/home-d.module').then( m => m.HomeDPageModule)
  },
  {
    path: 'home-p',
    loadChildren: () => import('./paciente/home-p/home-p.module').then( m => m.HomePPageModule)
  },
  {
    path: 'cuestionario',
    loadChildren: () => import('./paciente/cuestionario/cuestionario.module').then( m => m.CuestionarioPageModule)
  },
  {
    path: 'cuestionario-e',
    loadChildren: () => import('./paciente/cuestionario-e/cuestionario-e.module').then( m => m.CuestionarioEPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
