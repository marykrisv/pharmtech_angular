import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DosageRoutingModule } from './dosage-routing.module';
import { AdddosageComponent } from './adddosage/adddosage.component';
import { ViewdosageComponent } from './viewdosage/viewdosage.component';
import { DosagedetailComponent } from './dosagedetail/dosagedetail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdddosageComponent, 
    ViewdosageComponent, 
    DosagedetailComponent
  ],
  imports: [
    CommonModule,
    DosageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DosageModule { }
