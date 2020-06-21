import { ViewuserComponent } from './../user/viewuser/viewuser.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'viewall',
    component: ViewuserComponent
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
