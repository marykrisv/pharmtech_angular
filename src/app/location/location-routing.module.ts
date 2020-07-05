import { ViewlocationComponent } from './viewlocation/viewlocation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddlocationComponent
  },
  {
    path: 'detail/:locId',
    component: LocationdetailComponent
  },
  {
    path: '',
    component: ViewlocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
