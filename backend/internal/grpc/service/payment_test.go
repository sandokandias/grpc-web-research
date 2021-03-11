package service

import (
	"testing"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
	"google.golang.org/grpc"
)

type mockPayServer struct {
	grpc.ServerStream
}

func (x *mockPayServer) Send(m *api.PayResponse) error {
	return nil
}

func TestPay(t *testing.T) {
	t.Run("pay", func(t *testing.T) {
		service := NewPayment()
		err := service.Pay(&api.PayRequest{Amount: 1000, Description: "Streaming subscription"}, &mockPayServer{})

		if err != nil {
			t.Errorf("got %q, want <nil>", err)
		}
	})
}
