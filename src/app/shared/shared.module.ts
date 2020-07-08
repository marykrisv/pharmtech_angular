import { YesNoPipe } from './../pipes/yesno.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    YesNoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YesNoPipe,
    CommonModule
  ]
})
export class SharedModule { }
