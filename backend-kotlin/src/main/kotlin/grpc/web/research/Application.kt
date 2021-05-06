package grpc.web.research

import io.grpc.Server
import io.grpc.ServerBuilder

class PaymentServer(
	private val port: Int,
	private val server: Server = ServerBuilder.forPort(port).addService(PaymentService()).build()
) {
	fun start() {
		server.start()
		println("Server started, listening on $port")
		Runtime.getRuntime().addShutdownHook(
			Thread {
				println("*** shutting down gRPC server since JVM is shutting down")
				this@PaymentServer.stop()
				println("*** server shut down")
			}
		)
	}

	private fun stop() {
		server.shutdown()
	}

	fun blockUntilShutdown() {
		server.awaitTermination()
	}
}

fun main() {
	val port = 8080
	val server = PaymentServer(port)
	server.start()
	server.blockUntilShutdown()
}