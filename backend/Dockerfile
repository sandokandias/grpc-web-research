FROM golang:1.16-alpine as builder
RUN apk add --no-cache bash ca-certificates git build-base gcc abuild binutils protoc
WORKDIR /backend

# restore dependencies
RUN go env GO111MODULE="auto"
RUN go get google.golang.org/protobuf/cmd/protoc-gen-go google.golang.org/grpc/cmd/protoc-gen-go-grpc
COPY backend/go.mod backend/go.sum ./
RUN go mod download
RUN ls -la

COPY backend/cmd/ ./cmd/
COPY backend/internal/ ./internal/

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./time-backend -v ./cmd/server/main.go

FROM alpine as release
RUN apk add --no-cache ca-certificates
COPY --from=builder /backend/time-backend /time-backend
EXPOSE 5050
ENTRYPOINT ["/time-backend"]