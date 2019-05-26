import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ICredit } from '../../../core/interfaces/credit/credit';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit, OnChanges {

  @Input() data: ICredit;

  public creditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.data && this.data) {
      this.initForm(this.data);
    }
  }

  initForm(credit?: any): void {
    this.creditForm = this.formBuilder.group({
      id: [credit ? credit.id : ''],
      value: [credit ? credit.value : '', [Validators.required, Validators.min(100000), Validators.max(1000000)]],
      payment_date: [credit ? credit.payment_date : ''],
      status: [{value: credit ? credit.status : null, disabled: !this.data}],
      paid: [{value: credit ? credit.paid : false, disabled: !this.data}]
    });
  }
}
