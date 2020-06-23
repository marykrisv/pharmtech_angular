import { DashboardGuard } from './guard/dashboard.guard';
import { AuthGuard } from './auth/auth.guard';
import { ViewinventoryComponent } from './inventory/viewinventory/viewinventory.component';
import { MenuviewComponent } from './menuview/menuview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './dashboard/report/report.component';
import { LoginComponent } from './login/login/login.component';
import { UserGuard } from './guard/user.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuviewComponent,
    children: [
      {
        path: 'dashboard',
        component: ReportComponent,
        canActivate: [DashboardGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UsersModule),
        canActivate: [UserGuard]
      },
      {
        path: 'inventory',
        component: ViewinventoryComponent
        // canActivate: [AuthGuard],
      },
      {
        path: 'patient-management',
        loadChildren: () => import('./patient-management/patient-management.module').then(m => m.PatientManagementModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '\login',
    pathMatch: 'full'
  }
  // {
  //   path: '**',
  //   component: LoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
