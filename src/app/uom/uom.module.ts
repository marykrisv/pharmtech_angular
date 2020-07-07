import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomRoutingModule } from './uom-routing.module';
import { AdduomComponent } from './adduom/adduom.component';
import { ViewuomComponent } from './viewuom/viewuom.component';
import { UomdetailComponent } from './uomdetail/uomdetail.component';


@NgModule({
  declarations: [AdduomComponent, ViewuomComponent, UomdetailComponent],
  imports: [
    CommonModule,
    UomRoutingModule
  ]
})
export class UomModule { }
