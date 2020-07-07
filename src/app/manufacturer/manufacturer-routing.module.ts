import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmanufacturerComponent } from './addmanufacturer/addmanufacturer.component';
import { ManufacturerdetailComponent } from './manufacturerdetail/manufacturerdetail.component';
import { ViewmanufacturerComponent } from './viewmanufacturer/viewmanufacturer.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddmanufacturerComponent
  },
  {
    path: 'detail/:manId',
    component: ManufacturerdetailComponent
  },
  {
    path: '',
    component: ViewmanufacturerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
