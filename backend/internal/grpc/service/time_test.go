package service

import (
	"context"
	"fmt"
	"testing"

	"github.com/sandokandias/grpc-consumer-research/backend/internal/grpc/api"
)

func TestGetTime(t *testing.T) {
	t.Run("get time", func(t *testing.T) {
		service := NewTime()
		resp, err := service.GetTime(context.Background(), &api.TimeRequest{})

		if err != nil {
			t.Errorf("got %q, want <nil>", err)
		}

		if resp == nil {
			t.Errorf("got <nil>, want unix:<int64> utc:<string>")
		}

		fmt.Println(resp)
	})
}
