import { ViewuserComponent } from './../user/viewuser/viewuser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UserdetailComponent } from './userdetail/userdetail.component';


const routes: Routes = [
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: 'viewall',
    component: ViewuserComponent
  },
  {
    path: 'userdetail',
    component: UserdetailComponent
  },
  {
    path: '',
    component: ViewuserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
