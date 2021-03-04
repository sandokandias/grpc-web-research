package main

import (
	"log"
	"net"

	"github.com/sandokandias/grpc-consumer-research/internal/grpc/api"
	"github.com/sandokandias/grpc-consumer-research/internal/grpc/service"

	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", "localhost:5050")
	if err != nil {
		log.Fatal("failed to listen", err)
	}

	timeService := service.NewTimeService()
	grpcServer := grpc.NewServer()
	api.RegisterTimeServiceServer(grpcServer, timeService)
	grpcServer.Serve(lis)
}
