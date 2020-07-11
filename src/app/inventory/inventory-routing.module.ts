import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewinventoryComponent } from './viewinventory/viewinventory.component';
import { AddinventoryComponent } from './addinventory/addinventory.component';


const routes: Routes = [
  {
    path: '',
    component: AddinventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
