import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule
  ]
})
export class DashboardModule { }
