// package: proto
// file: payment.proto

import * as payment_pb from "./payment_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PaymentServicepay = {
  readonly methodName: string;
  readonly service: typeof PaymentService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof payment_pb.PayRequest;
  readonly responseType: typeof payment_pb.PayResponse;
};

export class PaymentService {
  static readonly serviceName: string;
  static readonly pay: PaymentServicepay;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class PaymentServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  pay(requestMessage: payment_pb.PayRequest, metadata?: grpc.Metadata): ResponseStream<payment_pb.PayResponse>;
}

