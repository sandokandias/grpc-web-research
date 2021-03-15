package service

import (
	"context"
	"log"
	"time"

	"github.com/sandokandias/grpc-web-research/backend/internal/grpc/api"
)

// TimeService unary rpc service implementation
type TimeService struct {
	api.UnimplementedTimeServiceServer
}

// NewTime creates a new rpc unary service implementation
func NewTime() TimeService {
	return TimeService{}
}

// GetTime gets the server current time and returns in 2 formats: (unix, utc)
func (TimeService) GetTime(ctx context.Context, request *api.TimeRequest) (*api.TimeResponse, error) {
	now := time.Now()
	unix := now.Unix()
	utc := now.String()

	log.Printf("get unix and utc from: %v\n", now)

	return &api.TimeResponse{
		Unix: unix,
		Utc:  utc,
	}, nil
}
