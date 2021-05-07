import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDPageRoutingModule } from './home-d-routing.module';

import { HomeDPage } from './home-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDPageRoutingModule
  ],
  declarations: [HomeDPage]
})
export class HomeDPageModule {}
