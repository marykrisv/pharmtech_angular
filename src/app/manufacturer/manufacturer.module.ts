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
    ManufacturerRoutingModule
  ]
})
export class ManufacturerModule { }
