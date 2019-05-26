import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditComponent } from './credit/credit.component';

const routes: Routes = [{
  path: '',
  component: CreditComponent,
  children: [
    { path: '', component: CreditComponent },
    { path: 'detail/:client-id/:credit-id', component: CreditComponent }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
