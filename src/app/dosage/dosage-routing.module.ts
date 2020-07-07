import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddosageComponent } from './adddosage/adddosage.component';
import { DosagedetailComponent } from './dosagedetail/dosagedetail.component';
import { ViewdosageComponent } from './viewdosage/viewdosage.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdddosageComponent
  },
  {
    path: 'detail/:dosId',
    component: DosagedetailComponent
  },
  {
    path: '',
    component: ViewdosageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DosageRoutingModule { }
