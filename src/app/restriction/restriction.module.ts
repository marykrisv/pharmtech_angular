import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictionRoutingModule } from './restriction-routing.module';
import { AddrestrictionComponent } from './addrestriction/addrestriction.component';
import { ViewrestrictionComponent } from './viewrestriction/viewrestriction.component';
import { RestrictiondetailComponent } from './restrictiondetail/restrictiondetail.component';


@NgModule({
  declarations: [AddrestrictionComponent, ViewrestrictionComponent, RestrictiondetailComponent],
  imports: [
    CommonModule,
    RestrictionRoutingModule
  ]
})
export class RestrictionModule { }
