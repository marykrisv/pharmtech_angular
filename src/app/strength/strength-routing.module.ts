import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddstrengthComponent } from './addstrength/addstrength.component';
import { StrengthdetailComponent } from './strengthdetail/strengthdetail.component';
import { ViewstrengthComponent } from './viewstrength/viewstrength.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddstrengthComponent
  },
  {
    path: 'detail/:strId',
    component: StrengthdetailComponent
  },
  {
    path: '',
    component: ViewstrengthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrengthRoutingModule { }
