import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/publishReplay';
import { Payment } from './payment';
import { PayRequest, PayResponse } from './proto/payment_pb';
import {PaymentServiceClient, Status} from './proto/payment_pb_service'
import {environment} from '../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PaymentService implements OnDestroy {
    client: PaymentServiceClient;

    status: PayResponse[] = [];

    private statusSource = new Subject<Array<PayResponse>>();

    status$ = this.statusSource.asObservable().publishReplay(1).refCount();

    constructor() {
        this.client = new PaymentServiceClient(environment.paymentServiceUrl)
    }

    ngOnDestroy(): void {
        this.statusSource.complete();
    }

    pay(path: string, val: Payment){
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
                this.status.push(message.toObject() as PayResponse);
                this.statusSource.next(this.status);

            });
            stream.on('end', () => {
                console.log('PaymentService.pay.end');
            });
        
    }
}