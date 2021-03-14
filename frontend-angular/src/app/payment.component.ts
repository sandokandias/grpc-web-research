import { Component } from '@angular/core';
import { Payment } from './payment';
import { PaymentService } from './payment.service';
import { PayResponse } from './proto/payment_pb';

@Component({
  selector: 'app-pay',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  model: Payment = new Payment();
  payId: string = "";
  payResponse: PayResponse[] = [];
  submitted = false;

  constructor(
    private service: PaymentService
    ){}

    onSubmit () {
     this.submitted = true;
     this.service.pay('pay', this.model).subscribe(response => {
        this.payId = "Payment ID: " + response.getPayid();
        this.payResponse.push(response);
     });
  }
} 
