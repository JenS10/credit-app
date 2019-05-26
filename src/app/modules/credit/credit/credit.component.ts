import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { ClientApplicationComponent } from '../../../shared/components/client-application/client-application.component';
import { CreditApplicationComponent } from '../../../shared/components/credit-application/credit-application.component';
import { ClientService } from '../../../core/services/client/client.service';
import { CreditsService } from '../../../core/services/credits/credits.service';
import { IClient } from '../../../core/interfaces/client/client';
import { ICredit } from '../../../core/interfaces/credit/credit';


@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  @ViewChild('creditData') creditData: CreditApplicationComponent;
  @ViewChild('clientData') clientData: ClientApplicationComponent;

  public clientExist: boolean;
  public approved: boolean;
  public clientInfo: IClient;
  public creditInfo: ICredit;
  public cliendId: number;
  public creditId: number;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private creditService: CreditsService,
    private snackBar: MatSnackBar) {
      this.clientExist = false;
      this.approved = false;
    }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.cliendId = +params.get('client-id');
        this.creditId = +params.get('credit-id');
      });
  }

  getClientCredit(): void {
    this.clientService.get(this.cliendId)
      .pipe(
        mergeMap((d) => {
          this.clientInfo = d;

          return this.creditService.get(this.creditId);
        })
      ).subscribe((c) => this.creditInfo = c);
  }

  save(): void {
    if (!this.clientData.clientForm.valid || !this.creditData.creditForm.valid) {
      this.snackBar.open('Complete los campos', 'Cerrar');

      return;
    }

    this.clientInfo = this.clientData.clientForm.getRawValue();
    this.creditInfo = this.creditData.creditForm.getRawValue();
    this.creditInfo.date_application = new Date().toString();

      this.clientService.getAll({identification: this.clientInfo.identification})
      .pipe(
        mergeMap((d) => {
          this.clientExist = d.length > 0;
          if (this.clientExist) {
            this.creditInfo.client_id = d[0].id;
          }

          return this.clientExist ? this.creditService.getAll({client_id: d[0].id}) : of(null);
        }),
        mergeMap((c) => {
           if (this.clientExist) {
             if (c.some(s => !s.status)) {
               this.approved = false;
               this.snackBar.open('El cliente no puede solicitar credito porq tiene solicitudes rechazadas', 'Cerrar');
             } else if (c.some(s => s.status && !s.paid)) {
               this.approved = false;
               this.snackBar.open('El cliente no puede solicitar credito porq no ha completado de pagar uno ya existente', 'Cerrar');
              } else if (c.every(s => s.status && s.paid)) {
                this.approved = true;
                this.snackBar.open('Crédito aprobado', 'Cerrar');
             }
           } else {
             this.approved =  Math.random() < 0.7;
             if (this.approved) {
              this.snackBar.open('Crédito aprobado', 'Cerrar');
             } else {
              this.snackBar.open('Crédito rechazado', 'Cerrar');
             }
           }
          return this.saveCredit(this.approved);
        })
      )
      .subscribe();

  }

  saveClientAndCredit(status: boolean): Observable<any> {
    this.creditInfo.status = status;

    return this.clientService.post(this.clientInfo)
      .pipe(
        mergeMap((d) => {
          this.creditInfo.client_id = d.id;

          return this.creditService.post(this.creditInfo);
        })
      );
  }

  saveCredit(status: boolean): Observable<any> {
    this.creditInfo.status = status;

    return this.clientExist ? this.creditService.post(this.creditInfo) : this.saveClientAndCredit(status);
  }

}
