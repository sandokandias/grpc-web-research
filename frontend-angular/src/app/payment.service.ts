import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from './payment';
import { PayRequest, PayResponse } from './proto/payment_pb';
import {PaymentServiceClient, Status} from './proto/payment_pb_service'
import { WINDOW } from './window.providers';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    client: PaymentServiceClient;

    constructor(@Inject(WINDOW) private window: Window) {
        this.client = new PaymentServiceClient('http://' + this.window.location.hostname)
    }

    pay(path: string, val: Payment): Observable<PayResponse> {
        return new Observable(obs => {
            console.log("PaymentService", path, val)
            const req = new PayRequest();
            req.setAmount(val.amount);
            req.setDescription(val.description);
            const stream = this.client.pay(req);
            stream.on('status', (status: Status) => {
                console.log('PaymentService.pay.status', status);
            });
            stream.on('data', (message: any) => {
                console.log('PaymentService.pay.data', message.toObject());
                obs.next(message.toObject() as PayResponse);
            });
            stream.on('end', () => {
                console.log('PaymentService.pay.end');
                obs.complete();
            });
        });
    }
}