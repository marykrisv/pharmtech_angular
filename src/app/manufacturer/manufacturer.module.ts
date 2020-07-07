import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { AddmanufacturerComponent } from './addmanufacturer/addmanufacturer.component';
import { ViewmanufacturerComponent } from './viewmanufacturer/viewmanufacturer.component';
import { ManufacturerdetailComponent } from './manufacturerdetail/manufacturerdetail.component';


@NgModule({
  declarations: [AddmanufacturerComponent, ViewmanufacturerComponent, ManufacturerdetailComponent],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManufacturerModule { }
