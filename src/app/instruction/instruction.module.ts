import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { AddinstructionComponent } from './addinstruction/addinstruction.component';
import { ViewinstructionComponent } from './viewinstruction/viewinstruction.component';
import { InstructiondetailComponent } from './instructiondetail/instructiondetail.component';


@NgModule({
  declarations: [AddinstructionComponent, ViewinstructionComponent, InstructiondetailComponent],
  imports: [
    CommonModule,
    InstructionRoutingModule
  ]
})
export class InstructionModule { }
