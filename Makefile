SHELL=/bin/bash

BIN_NAME=timeservice
CMD_SERVER_PATH=./backend/cmd/server/main.go
CMD_CLIENT_PATH=./backend/cmd/client/main.go
BIN=bin
DIST=dist
DIST_MAC=$(DIST)/darwin
DIST_LINUX=$(DIST)/linux
DIST_WIN=$(DIST)/windows
PROTO_GO_DIR=backend/internal/grpc/api
PROTO_JS_DIR=frontend/grpc/api

all: clean clean-proto gen-go-proto gen-js-proto test build

gen-go-proto:
	protoc --go_out=$(PROTO_GO_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(PROTO_GO_DIR) \
		-I proto --go-grpc_opt=paths=source_relative proto/*.proto

gen-js-proto:
	protoc -I proto proto/*.proto \
	    --js_out=import_style=commonjs:$(PROTO_JS_DIR) \
	    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$(PROTO_JS_DIR)

build-linux:
	mkdir -p $(DIST_LINUX)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./$(DIST_LINUX)/$(BIN_NAME) -v $(CMD_SERVER_PATH)

build-mac:
	mkdir -p $(DIST_MAC)
	GOOS=darwin GOARCH=amd64 go build -o ./$(DIST_MAC)/$(BIN_NAME) -v $(CMD_SERVER_PATH)

build-windows:
	mkdir -p $(DIST_WIN)
	GOOS=windows GOARCH=amd64 go build -o ./$(DIST_WIN)/$(BIN_NAME).exe -v $(CMD_SERVER_PATH)

build: build-linux build-mac build-windows

test:
	./test.sh

run-server:
	go run $(CMD_SERVER_PATH)

run-go-client:
	go run $(CMD_CLIENT_PATH)

clean:
	rm -rf $(DIST)
	rm -rf $(BIN)

clean-proto:
	rm -rf $(PROTO_GO_DIR)/*
	rm -rf $(PROTO_JS_DIR)/*

release: build-linux
	docker build -t sandokandias/$(BIN_NAME) .
	docker push sandokandias/$(BIN_NAME)