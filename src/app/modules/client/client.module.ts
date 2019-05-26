import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ClientComponent } from './client/client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientsListComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
  ]
})
export class ClientModule { }
