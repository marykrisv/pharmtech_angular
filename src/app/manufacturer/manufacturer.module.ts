import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { AddmanufacturerComponent } from './addmanufacturer/addmanufacturer.component';
import { ViewmanufacturerComponent } from './viewmanufacturer/viewmanufacturer.component';
import { ManufacturerdetailComponent } from './manufacturerdetail/manufacturerdetail.component';


@NgModule({
  declarations: [AddmanufacturerComponent, ViewmanufacturerComponent, ManufacturerdetailComponent],
  imports: [
    ManufacturerRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ManufacturerModule { }
