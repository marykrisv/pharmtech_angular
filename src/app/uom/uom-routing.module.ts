import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduomComponent } from './adduom/adduom.component';
import { UomdetailComponent } from './uomdetail/uomdetail.component';
import { ViewuomComponent } from './viewuom/viewuom.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdduomComponent
  },
  {
    path: 'detail/:uomId',
    component: UomdetailComponent
  },
  {
    path: '',
    component: ViewuomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomRoutingModule { }
