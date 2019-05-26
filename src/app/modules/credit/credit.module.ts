import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit/credit.component';

@NgModule({
  declarations: [CreditComponent],
  imports: [
    SharedModule,
    CreditRoutingModule
  ]
})
export class CreditModule { }
