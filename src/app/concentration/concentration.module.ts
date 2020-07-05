import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcentrationRoutingModule } from './concentration-routing.module';
import { ViewconcentrationComponent } from './viewconcentration/viewconcentration.component';
import { AddconcentrationComponent } from './addconcentration/addconcentration.component';
import { ConcentrationdetailComponent } from './concentrationdetail/concentrationdetail.component';


@NgModule({
  declarations: [ViewconcentrationComponent, AddconcentrationComponent, ConcentrationdetailComponent],
  imports: [
    CommonModule,
    ConcentrationRoutingModule
  ]
})
export class ConcentrationModule { }
