import { AuthGuard } from './auth/auth.guard';
import { ViewinventoryComponent } from './inventory/viewinventory/viewinventory.component';
import { MenuviewComponent } from './menuview/menuview.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './dashboard/report/report.component';
import { ViewuserComponent } from './user/viewuser/viewuser.component';


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
        component: ReportComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UsersModule)
      },
      {
        path: 'inventory',
        component: ViewinventoryComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '',
    component: LoginComponent
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
