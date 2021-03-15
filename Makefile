SHELL=/bin/bash

BIN_BACKEND_NAME=grpc-backend
BIN_FRONTEND_NAME=grpc-frontend
CMD_SERVER_PATH=./backend/cmd/server/main.go
CMD_CLIENT_PATH=./backend/cmd/client/main.go
BIN=bin
DIST=dist
DIST_MAC=$(DIST)/darwin
DIST_LINUX=$(DIST)/linux
DIST_WIN=$(DIST)/windows
PROTO_GO_DIR=backend/internal/grpc/api
PROTO_JS_DIR=frontend-angular/src/app/proto

all: clean clean-proto gen-go-proto build gen-js-proto

gen-go-proto:
	protoc --go_out=$(PROTO_GO_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(PROTO_GO_DIR) \
		-I proto --go-grpc_opt=paths=source_relative proto/*.proto

gen-js-proto:
	protoc \
		--plugin=protoc-gen-ts=./frontend-angular/node_modules/.bin/protoc-gen-ts \
		--js_out=import_style=commonjs,binary:$(PROTO_JS_DIR) \
		--ts_out=service=grpc-web:$(PROTO_JS_DIR) \
		-I proto/ proto/*.proto

build-linux:
	mkdir -p $(DIST_LINUX)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./$(DIST_LINUX)/$(BIN_BACKEND_NAME) -v $(CMD_SERVER_PATH)

build-mac:
	mkdir -p $(DIST_MAC)
	GOOS=darwin GOARCH=amd64 go build -o ./$(DIST_MAC)/$(BIN_BACKEND_NAME) -v $(CMD_SERVER_PATH)

build-windows:
	mkdir -p $(DIST_WIN)
	GOOS=windows GOARCH=amd64 go build -o ./$(DIST_WIN)/$(BIN_BACKEND_NAME).exe -v $(CMD_SERVER_PATH)

build: build-linux build-mac build-windows

test:
	./test.sh

run-server:
	go run $(CMD_SERVER_PATH)

run-go-client:
	go run $(CMD_CLIENT_PATH)

clean:
	rm -rf $(DIST)
	rm -rf $(BIN_BACKEND_NAME)

clean-proto:
	rm -rf $(PROTO_GO_DIR)/*
	rm -rf $(PROTO_JS_DIR)/*

build-backend-img:
	docker build -t sandokandias/$(BIN_BACKEND_NAME) -f backend/Dockerfile .

build-frontend-img:
	docker build -t sandokandias/$(BIN_FRONTEND_NAME) -f frontend-angular/Dockerfile .

release-frontend: build-frontend-img
	docker push sandokandias/$(BIN_FRONTEND_NAME)

release-backend: build-backend-img
	docker push sandokandias/$(BIN_BACKEND_NAME)

release: release-backend release-frontend
	
