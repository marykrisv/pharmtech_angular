import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewinventoryComponent } from './viewinventory/viewinventory.component';


const routes: Routes = [
  {
    path: 'addproduct',
    component: AddproductComponent
  },
  {
    path: '',
    component: ViewinventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
