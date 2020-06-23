import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmViewComponent } from './pm-view/pm-view.component';


const routes: Routes = [
  {
    path: 'patient-management',
    component: PmViewComponent
  },
  {
    path: '',
    component: PmViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientManagementRoutingModule { }
