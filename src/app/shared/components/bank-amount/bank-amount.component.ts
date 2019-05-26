import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { CreditsService } from '../../../core/services/credits/credits.service';

@Component({
  selector: 'app-bank-amount',
  templateUrl: './bank-amount.component.html',
  styleUrls: ['./bank-amount.component.css']
})
export class BankAmountComponent implements OnInit {

  public value: number;
  public base: number;

  constructor(private creditsService: CreditsService) {
    this.base = environment.baseAmount;
    this.value = 0;
  }

  ngOnInit() {
    this.creditsService.getAll({status: true, paid: false })
      .pipe(
        mergeMap(d => {
          this.value = this.base - d.reduce((a, b) => a + b.value, 0);

          return this.creditsService.getAll({status: true, paid: true });
        })
      )
      .subscribe((c) => this.value = this.value + c.reduce((a, b) => a + b.value, 0));
  }

}
