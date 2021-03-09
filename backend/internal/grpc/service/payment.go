package service

import (
	"log"
	"time"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// PaymentService stream rpc service implementation
type PaymentService struct {
	api.UnimplementedPaymentServiceServer
}

// NewPayment creates a new rpc stream service implementation
func NewPayment() PaymentService {
	return PaymentService{}
}

// Pay perform the payment and send the status foreach phase.
func (PaymentService) Pay(request *api.PayRequest, stream api.PaymentService_PayServer) error {
	log.Printf("processing payment: %v\n", request)

	if request.Amount < 0 {
		return status.Error(codes.InvalidArgument, "the amount must be greater or equal to 0")
	}

	stream.Send(&api.PayResponse{
		Status: "processing",
	})

	time.Sleep(time.Second * 1)
	if err := stream.Send(&api.PayResponse{
		Status: "authorizing",
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	if err := stream.Send(&api.PayResponse{
		Status: "authorized",
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	if err := stream.Send(&api.PayResponse{
		Status: "confirming",
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	if err := stream.Send(&api.PayResponse{
		Status: "confirmed",
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	if err := stream.Send(&api.PayResponse{
		Status: "done",
	}); err != nil {
		return err
	}

	return nil

}
