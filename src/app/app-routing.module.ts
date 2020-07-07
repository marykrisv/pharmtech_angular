import { ConcentrationModule } from './concentration/concentration.module';
import { LocationModule } from './location/location.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { InventoryGuard } from './guard/inventory.guard';
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
        component: ViewinventoryComponent,
        canActivate: [InventoryGuard]
      },
      {
        path: 'patient-management',
        loadChildren: () => import('./patient-management/patient-management.module').then(m => m.PatientManagementModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'concentrations',
        loadChildren: () => import('./concentration/concentration.module').then(m => m.ConcentrationModule)
      },
      {
        path: 'discounts',
        loadChildren: () => import('./discount/discount.module').then(m => m.DiscountModule)
      },
      {
        path: 'dosages',
        loadChildren: () => import('./dosage/dosage.module').then(m => m.DosageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '\login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
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
