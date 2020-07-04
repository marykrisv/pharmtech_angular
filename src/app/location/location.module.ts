import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { ViewlocationComponent } from './viewlocation/viewlocation.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';


@NgModule({
  declarations: [ViewlocationComponent, AddlocationComponent, LocationdetailComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocationModule { }
