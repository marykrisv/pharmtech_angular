import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddconcentrationComponent } from './addconcentration/addconcentration.component';
import { ConcentrationdetailComponent } from './concentrationdetail/concentrationdetail.component';
import { ViewconcentrationComponent } from './viewconcentration/viewconcentration.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddconcentrationComponent
  },
  {
    path: 'detail/:conId',
    component: ConcentrationdetailComponent
  },
  {
    path: '',
    component: ViewconcentrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcentrationRoutingModule { }
