package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"time"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
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

	client := api.NewTimeServiceClient(conn)
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
}
