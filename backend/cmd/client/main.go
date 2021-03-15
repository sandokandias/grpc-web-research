package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"log"
	"time"

	"github.com/sandokandias/grpc-web-research/backend/internal/grpc/api"
	"google.golang.org/grpc"

	"github.com/gosuri/uitable"
)

var (
	address = flag.String("address", "localhost:9000", "Address of the server in format <ip/name:port>. e.g.: 0.0.0.0:9000")
)

func main() {
	flag.Parse()

	conn, err := grpc.Dial(*address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	timeCli := api.NewTimeServiceClient(conn)
	getTime(timeCli)

	payCli := api.NewPaymentServiceClient(conn)
	pay(payCli)
}

func getTime(client api.TimeServiceClient) {
	fmt.Println("Time service")
	fmt.Println("---------------------------")
	deadline := time.Now().Add(time.Duration(10) * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	req := &api.TimeRequest{}
	resp, err := client.GetTime(ctx, req)
	if err != nil {
		log.Fatalf("failed get time: %v", err)
	}

	table := uitable.New()
	table.MaxColWidth = 100
	table.AddRow("UNIX", "UTC")
	table.AddRow(resp.Unix, resp.Utc)
	fmt.Println(table)
	fmt.Println("---------------------------")
	fmt.Println()
}

func pay(client api.PaymentServiceClient) {
	fmt.Println("Payment service")
	fmt.Println("---------------------------")
	deadline := time.Now().Add(time.Duration(10) * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	req := &api.PayRequest{Amount: 100, Description: "test"}
	stream, err := client.Pay(ctx, req)
	if err != nil {
		log.Fatalf("failed pay: %v", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("%v.Pay(_) = _, %v", client, err)
		}

		fmt.Printf("%v\n", resp)
	}
	fmt.Println("---------------------------")
}
