package grpc.web.research

import io.grpc.stub.StreamObserver
import proto.Payment
import proto.PaymentServiceGrpc
import java.time.Instant
import java.util.*
import java.util.concurrent.TimeUnit

class PaymentService : PaymentServiceGrpc.PaymentServiceImplBase() {
    override fun pay(request: Payment.PayRequest?, responseObserver: StreamObserver<Payment.PayResponse>?) {
        val payID = UUID.randomUUID().toString()
        println("Authorizing payment: $request")
        var response = Payment.PayResponse
            .newBuilder()
            .setStatus("Authorizing")
            .setPayId(payID)
            .setDateTime(Instant.now().toString())
            .build()
        responseObserver?.onNext(response)

        TimeUnit.SECONDS.sleep(1)
        println("Payment authorized: $request")
        response = Payment.PayResponse
            .newBuilder()
            .setStatus("Authorized")
            .setPayId(payID)
            .setDateTime(Instant.now().toString())
            .build()
        responseObserver?.onNext(response)

        TimeUnit.SECONDS.sleep(1)
        println("Confirming payment: $request")
        response = Payment.PayResponse
            .newBuilder()
            .setStatus("Confirming")
            .setPayId(payID)
            .setDateTime(Instant.now().toString())
            .build()
        responseObserver?.onNext(response)

        TimeUnit.SECONDS.sleep(1)
        println("Payment confirmed: $request")
        response = Payment.PayResponse
            .newBuilder()
            .setStatus("Confirmed")
            .setPayId(payID)
            .setDateTime(Instant.now().toString())
            .build()
        responseObserver?.onNext(response)

        TimeUnit.SECONDS.sleep(1)
        println("Payment done: $request")
        response = Payment.PayResponse
            .newBuilder()
            .setStatus("Done")
            .setPayId(payID)
            .setDateTime(Instant.now().toString())
            .build()
        responseObserver?.onNext(response)
        responseObserver?.onCompleted()
    }
}