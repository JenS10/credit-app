import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { BankAmountComponent } from './components/bank-amount/bank-amount.component';
import { CreditApplicationComponent } from './components/credit-application/credit-application.component';
import { ClientApplicationComponent } from './components/client-application/client-application.component';
import { StatusApplicationPipe } from './pipes/status-application.pipe';
import { StatusCreditPipe } from './pipes/status-credit.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BankAmountComponent,
    CreditApplicationComponent,
    ClientApplicationComponent,
    StatusApplicationPipe,
    StatusCreditPipe
  ],
  declarations: [
    BankAmountComponent,
    CreditApplicationComponent,
    ClientApplicationComponent,
    StatusApplicationPipe,
    StatusCreditPipe
  ]
})
export class SharedModule { }
