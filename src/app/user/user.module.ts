import { MiddleNamePipe } from '../pipes/middle-name.pipe';
import { PopupComponent } from './../common/popup/popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './user-routing.module';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgePipe } from '../pipes/age.pipe';


@NgModule({
  declarations: [
    ViewuserComponent, 
    AdduserComponent, 
    UserdetailComponent, 
    PopupComponent,
    MiddleNamePipe,
    AgePipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
