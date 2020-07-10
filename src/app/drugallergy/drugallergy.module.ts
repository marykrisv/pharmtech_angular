import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugallergyRoutingModule } from './drugallergy-routing.module';
import { DrugallergydetailComponent } from './drugallergydetail/drugallergydetail.component';
import { ViewdrugallergyComponent } from './viewdrugallergy/viewdrugallergy.component';
import { AdddrugallergyComponent } from './adddrugallergy/adddrugallergy.component';


@NgModule({
  declarations: [DrugallergydetailComponent, ViewdrugallergyComponent, AdddrugallergyComponent],
  imports: [
    CommonModule,
    DrugallergyRoutingModule,
    ReactiveFormsModule
  ]
})
export class DrugallergyModule { }
