package service

import (
	"log"
	"time"

	"github.com/google/uuid"
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

	if len(request.Description) < 3 {
		return status.Error(codes.InvalidArgument, "the description must have at least 3 words")
	}

	if request.Amount < 0 {
		return status.Error(codes.InvalidArgument, "the amount must be greater or equal to 0")
	}

	payID := uuid.New().String()

	time.Sleep(time.Second * 1)
	log.Printf("authorizing payment: %v\n", request)
	if err := stream.Send(&api.PayResponse{
		Status:   "authorizing",
		PayId:    payID,
		DateTime: time.Now().UTC().String(),
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	log.Printf("payment authorized: %v\n", request)
	if err := stream.Send(&api.PayResponse{
		Status:   "authorized",
		PayId:    payID,
		DateTime: time.Now().UTC().String(),
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	log.Printf("confirming payment: %v\n", request)
	if err := stream.Send(&api.PayResponse{
		Status:   "confirming",
		PayId:    payID,
		DateTime: time.Now().UTC().String(),
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	log.Printf("payment confirmed: %v\n", request)
	if err := stream.Send(&api.PayResponse{
		Status:   "confirmed",
		PayId:    payID,
		DateTime: time.Now().UTC().String(),
	}); err != nil {
		return err
	}

	time.Sleep(time.Second * 1)
	log.Printf("payment done: %v\n", request)
	if err := stream.Send(&api.PayResponse{
		Status:   "done",
		PayId:    payID,
		DateTime: time.Now().UTC().String(),
	}); err != nil {
		return err
	}

	return nil

}
