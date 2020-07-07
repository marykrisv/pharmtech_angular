import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddinstructionComponent } from './addinstruction/addinstruction.component';
import { ViewinstructionComponent } from './viewinstruction/viewinstruction.component';
import { InstructiondetailComponent } from './instructiondetail/instructiondetail.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddinstructionComponent
  },
  {
    path: 'detail/:conId',
    component: InstructiondetailComponent
  },
  {
    path: '',
    component: ViewinstructionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionRoutingModule { }
