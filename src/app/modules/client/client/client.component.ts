import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { ClientService } from '../../../core/services/client/client.service';
import { IClient, IClientCredit } from '../../../core/interfaces/client/client';
import { CreditsService } from '../../../core/services/credits/credits.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public clientList: IClient[];
  public creditList: IClientCredit[];

  constructor(
    private clientService: ClientService,
    private creditService: CreditsService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.getClientCredits();
  }

  getClientCredits(filter?: {}): void {
    this.creditService.getAllClientCredit(filter)
      .pipe(
        mergeMap((d) => {
          this.creditList = d;

          return this.clientService.getAll();
        })
      )
      .subscribe((c) => {
        this.creditList = this.creditList.map(credit => {
          const client = c.find(f => f.id === credit.client_id);

          if (client) {
            credit.identification = client.identification;
            credit.name = client.name;
            credit.lastname = client.lastname;
            credit.email = client.email;
          }

          return credit;
        });
      });
  }

  pay(creditClient: IClientCredit): void {
    delete creditClient['name'];
    delete creditClient['lastname'];
    delete creditClient['identification'];
    delete creditClient['email'];
    creditClient.paid = true;

    this.creditService.put(creditClient.id, creditClient)
     .subscribe(() => {
       this.getClientCredits();
       this.snackBar.open('Crédito pagado de forma exitosa', 'Cerrar');
     },
     (e) => {
      this.snackBar.open(`Error ${e}` , 'Cerrar');
     });
  }
}
