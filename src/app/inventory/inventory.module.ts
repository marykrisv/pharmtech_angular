import { ManufacturerService } from './../services/manufacturer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ViewinventoryComponent } from './viewinventory/viewinventory.component';
import { AddinventoryComponent } from './addinventory/addinventory.component';


@NgModule({
  declarations: [ViewinventoryComponent, AddinventoryComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
