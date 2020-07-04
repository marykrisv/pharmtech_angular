import { ViewlocationComponent } from './viewlocation/viewlocation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';


const routes: Routes = [
  {
    path: 'addlocation',
    component: AddlocationComponent
  },
  {
    path: 'locationdetail/:locId',
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
