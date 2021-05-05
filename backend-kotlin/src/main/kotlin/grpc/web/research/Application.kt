package grpc.web.research

import io.micronaut.runtime.Micronaut.*
fun main(args: Array<String>) {
	build()
	    .args(*args)
		.packages("grpc.web.research")
		.start()
}

