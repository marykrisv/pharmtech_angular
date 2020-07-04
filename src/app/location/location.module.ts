import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { ViewlocationComponent } from './viewlocation/viewlocation.component';


@NgModule({
  declarations: [ViewlocationComponent],
  imports: [
    CommonModule,
    LocationRoutingModule
  ]
})
export class LocationModule { }
