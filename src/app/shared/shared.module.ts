import { TotalPipe } from '../pipes/total.pipe';
import { YesnoPipe } from '../pipes/yesno.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    YesnoPipe,
    TotalPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YesnoPipe,
    TotalPipe,
    CommonModule
  ]
})
export class SharedModule { }
