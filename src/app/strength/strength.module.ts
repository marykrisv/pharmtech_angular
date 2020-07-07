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
    StrengthRoutingModule
  ]
})
export class StrengthModule { }
