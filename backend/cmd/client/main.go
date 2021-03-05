package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
	"google.golang.org/grpc"

	"github.com/gosuri/uitable"
)

const (
	address = "localhost:5050"
)

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
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
