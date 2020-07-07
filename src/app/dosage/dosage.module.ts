import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DosageRoutingModule } from './dosage-routing.module';
import { AdddosageComponent } from './adddosage/adddosage.component';
import { ViewdosageComponent } from './viewdosage/viewdosage.component';
import { DosagedetailComponent } from './dosagedetail/dosagedetail.component';


@NgModule({
  declarations: [AdddosageComponent, ViewdosageComponent, DosagedetailComponent],
  imports: [
    CommonModule,
    DosageRoutingModule
  ]
})
export class DosageModule { }
