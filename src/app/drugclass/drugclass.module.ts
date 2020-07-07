import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugclassRoutingModule } from './drugclass-routing.module';
import { AdddrugclassComponent } from './adddrugclass/adddrugclass.component';
import { ViewdrugclassComponent } from './viewdrugclass/viewdrugclass.component';
import { DrugclassdetailComponent } from './drugclassdetail/drugclassdetail.component';


@NgModule({
  declarations: [AdddrugclassComponent, ViewdrugclassComponent, DrugclassdetailComponent],
  imports: [
    CommonModule,
    DrugclassRoutingModule
  ]
})
export class DrugclassModule { }
