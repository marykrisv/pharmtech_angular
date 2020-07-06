import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { AdddiscountComponent } from './adddiscount/adddiscount.component';
import { ViewdiscountComponent } from './viewdiscount/viewdiscount.component';
import { DiscountdetailComponent } from './discountdetail/discountdetail.component';


@NgModule({
  declarations: [AdddiscountComponent, ViewdiscountComponent, DiscountdetailComponent],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    ReactiveFormsModule
  ]
})
export class DiscountModule { }
