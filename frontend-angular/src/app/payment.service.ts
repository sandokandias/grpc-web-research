import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/publishReplay';
import { Payment } from './payment';
import { PayRequest, PayResponse } from './proto/payment_pb';
import {PaymentServiceClient, Status} from './proto/payment_pb_service'
import {environment} from '../environments/environment'
import { PaymentStatus } from './paymentstatus';

@Injectable({
    providedIn: 'root'
})
export class PaymentService implements OnDestroy {
    client: PaymentServiceClient;

    status: PaymentStatus[] = [];

    private statusSource = new Subject<Array<PaymentStatus>>();

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
            stream.on('data', (message: PayResponse) => {
                console.log('PaymentService.pay.data', message);
                let st = new PaymentStatus(
                    message.getPayid(),
                    message.getStatus(),
                    message.getDatetime()
                )
                this.status.push(st);
                this.statusSource.next(this.status);
            });
            stream.on('end', () => {
                console.log('PaymentService.pay.end');
            });
        
    }
}