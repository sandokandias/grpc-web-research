package main

import (
	"log"
	"net"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/service"

	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatal("failed to listen", err)
	}

	timeService := service.NewTime()
	payService := service.NewPayment()
	grpcServer := grpc.NewServer()
	api.RegisterTimeServiceServer(grpcServer, timeService)
	api.RegisterPaymentServiceServer(grpcServer, payService)
	grpcServer.Serve(lis)
}
