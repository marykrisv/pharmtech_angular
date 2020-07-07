import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddrestrictionComponent } from './addrestriction/addrestriction.component';
import { ViewrestrictionComponent } from './viewrestriction/viewrestriction.component';
import { RestrictiondetailComponent } from './restrictiondetail/restrictiondetail.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddrestrictionComponent
  },
  {
    path: 'detail/:resId',
    component: RestrictiondetailComponent
  },
  {
    path: '',
    component: ViewrestrictionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestrictionRoutingModule { }
