import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { PmViewComponent } from './pm-view/pm-view.component';


@NgModule({
  declarations: [PmViewComponent],
  imports: [
    CommonModule,
    PatientManagementRoutingModule
  ]
})
export class PatientManagementModule { }
