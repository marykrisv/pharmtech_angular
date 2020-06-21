import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './user-routing.module';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ViewuserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    BrowserModule
  ]
})
export class UsersModule { }
