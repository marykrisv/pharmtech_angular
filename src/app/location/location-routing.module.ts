import { ViewlocationComponent } from './viewlocation/viewlocation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'addlocation',
  //   component: AdduserComponent
  // },
  // {
  //   path: 'userdetail/:userId',
  //   component: UserdetailComponent
  // },
  {
    path: '',
    component: ViewlocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
