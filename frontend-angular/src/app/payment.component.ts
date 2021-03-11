import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './payment';
import { PaymentService } from './payment.service';
import { PayResponse } from './proto/payment_pb';

@Component({
  selector: 'app-pay',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  payment: Payment = new Payment();
  payId: string = "";
  payResponse: PayResponse[] = [];

  constructor(
    private service: PaymentService
    ){}

  handle (): void {
     this.service.pay('pay', this.payment).subscribe(response => {
        this.payId = "Payment ID: " + response.getPayid();
        this.payResponse.push(response);
     });
  }
} 
