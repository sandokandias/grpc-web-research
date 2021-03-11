import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentComponent} from './payment.component';

const routes: Routes = [
  { path: 'app-pay', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
