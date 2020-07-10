import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddrugallergyComponent } from './adddrugallergy/adddrugallergy.component';
import { DrugallergydetailComponent } from './drugallergydetail/drugallergydetail.component';
import { ViewdrugallergyComponent } from './viewdrugallergy/viewdrugallergy.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdddrugallergyComponent
  },
  {
    path: 'detail/:drugcId',
    component: DrugallergydetailComponent
  },
  {
    path: '',
    component: ViewdrugallergyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugallergyRoutingModule { }
