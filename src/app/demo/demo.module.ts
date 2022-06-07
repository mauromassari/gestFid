import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ButtonsComponent } from './buttons/buttons.component';


@NgModule({
  declarations: [
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,

    //importo il modulo MaterialModule
    MaterialModule,
  ]
})
export class DemoModule { }
