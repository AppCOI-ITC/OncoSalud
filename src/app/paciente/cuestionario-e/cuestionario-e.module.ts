import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuestionarioEPageRoutingModule } from './cuestionario-e-routing.module';

import { CuestionarioEPage } from './cuestionario-e.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionarioEPageRoutingModule
  ],
  declarations: [CuestionarioEPage]
})
export class CuestionarioEPageModule {}
