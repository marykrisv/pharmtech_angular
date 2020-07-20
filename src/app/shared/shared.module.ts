import { TotalPipe } from './../pipes/total.pipe';
import { YesNoPipe } from './../pipes/yesno.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    YesNoPipe,
    TotalPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YesNoPipe,
    TotalPipe,
    CommonModule
  ]
})
export class SharedModule { }
