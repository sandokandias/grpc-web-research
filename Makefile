SHELL=/bin/bash
# Go aliases
GO_CMD=go
GO_BUILD=$(GO_CMD) build
GO_CLEAN=$(GO_CMD) clean
GO_TEST=$(GO_CMD) test
GO_TOOL_COVER=$(GO_CMD) tool cover
GO_GET=$(GO_CMD) get
BIN_NAME=timeservice
CMD_PATH=./cmd/server/main.go
BIN=bin
DIST=dist
DIST_MAC=$(DIST)/darwin
DIST_LINUX=$(DIST)/linux
DIST_WIN=$(DIST)/windows
PROTO_PKG=internal/grpc/api

all: clean clean-proto gen-proto test build

gen-proto:
	protoc --go_out=$(PROTO_PKG) --go_opt=paths=source_relative --go-grpc_out=$(PROTO_PKG) -I proto --go-grpc_opt=paths=source_relative proto/*.proto

build-linux:
	mkdir -p $(DIST_LINUX)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GO_BUILD) -o ./$(DIST_LINUX)/$(BIN_NAME) -v $(CMD_PATH)

build-mac:
	mkdir -p $(DIST_MAC)
	GOOS=darwin GOARCH=amd64 $(GO_BUILD) -o ./$(DIST_MAC)/$(BIN_NAME) -v $(CMD_PATH)

build-windows:
	mkdir -p $(DIST_WIN)
	GOOS=windows GOARCH=amd64 $(GO_BUILD) -o ./$(DIST_WIN)/$(BIN_NAME).exe -v $(CMD_PATH)

build: build-linux build-mac build-windows

test:
	./test.sh

clean:
	rm -rf $(DIST)
	rm -rf $(BIN)

clean-proto:
	rm -rf $(PROTO_PKG)/*

release: build-linux
	docker build -t sandokandias/$(BIN_NAME) .
	docker push sandokandias/$(BIN_NAME)