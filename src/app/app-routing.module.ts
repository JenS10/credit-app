import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './modules/root/root/root.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [{
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
    pathMatch: 'full'
  }, {
    path: 'client',
    loadChildren: './modules/client/client.module#ClientModule',
    pathMatch: 'full'
  }, {
    path: 'credit',
    loadChildren: './modules/credit/credit.module#CreditModule',
    pathMatch: 'full'
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
