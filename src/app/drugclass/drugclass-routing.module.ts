import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewdrugclassComponent } from './viewdrugclass/viewdrugclass.component';
import { DrugclassdetailComponent } from './drugclassdetail/drugclassdetail.component';
import { AdddrugclassComponent } from './adddrugclass/adddrugclass.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdddrugclassComponent
  },
  {
    path: 'detail/:drugcId',
    component: DrugclassdetailComponent
  },
  {
    path: '',
    component: ViewdrugclassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugclassRoutingModule { }
