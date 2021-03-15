import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './payment';
import { PaymentService } from './payment.service';
import { PayResponse } from './proto/payment_pb';

@Component({
  selector: 'app-pay',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  {
  model: Payment = new Payment();
  status: Observable<Array<PayResponse>>;

  submitted = false;

  constructor(
    private service: PaymentService
    ){
      this.status = this.service.status$;
    }

    onSubmit () {
     this.submitted = true;
     this.service.pay('pay', this.model);
  }
} 
