import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddiscountComponent } from './adddiscount/adddiscount.component';
import { DiscountdetailComponent } from './discountdetail/discountdetail.component';
import { ViewdiscountComponent } from './viewdiscount/viewdiscount.component';


const routes: Routes = [
  {
    path: 'add',
    component: AdddiscountComponent
  },
  {
    path: 'detail/:conId',
    component: DiscountdetailComponent
  },
  {
    path: '',
    component: ViewdiscountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
