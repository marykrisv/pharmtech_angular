import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrengthRoutingModule } from './strength-routing.module';
import { AddstrengthComponent } from './addstrength/addstrength.component';
import { ViewstrengthComponent } from './viewstrength/viewstrength.component';
import { StrengthdetailComponent } from './strengthdetail/strengthdetail.component';


@NgModule({
  declarations: [AddstrengthComponent, ViewstrengthComponent, StrengthdetailComponent],
  imports: [
    CommonModule,
    StrengthRoutingModule,
    ReactiveFormsModule
  ]
})
export class StrengthModule { }
