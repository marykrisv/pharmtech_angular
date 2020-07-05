import { ViewuserComponent } from './../user/viewuser/viewuser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UserdetailComponent } from './userdetail/userdetail.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdduserComponent
  },
  {
    path: 'detail/:userId',
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
