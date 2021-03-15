# gRPC-web-research
R&amp;D about how to consume gRPC services by traditional http clients.

Will be presented 3 options of protocols: 
 - improbable-eng/grpc-web (https://github.com/improbable-eng/grpc-web)
 - google/gRPC-web ((https://grpc.io/docs/platforms/web/))
 - gRPC-mate (https://grpcmate.io/)

## Install tools
 - docker (https://docs.docker.com/engine/install/)
 - kubectl (https://kubernetes.io/docs/tasks/tools/)
 - k3d (https://k3d.io/)
 - istioctl (https://istio.io/latest/docs/setup/getting-started)

## Setup k3d cluster (local)
1. Create the k3d cluster
```bash
k3d cluster create multinode-cluster \
    --servers 1 --agents 3 --port 9080:80@loadbalancer \
    --port 9443:443@loadbalancer --api-port 6443 --k3s-server-arg '--no-deploy=traefik'
```
2. Install istio on cluster
```bash
istioctl install --set profile=demo
```
3. Enable automatic istio injection
```bash
kubectl label namespace default istio-injection=enabled
```
4. Install kiali and addons (optional)
```bash
kubectl apply -f <istio_dir>/samples/addons
```
5. Kiali dashboad (optional)
```bash
$ istioctl dashboard kiali
``` 

## Down k3d cluster
```bash
k3d cluster stop multinode-cluster && k3d cluster delete multinode-cluster
```

## Option 1: improbable-eng/gRPC-web
Implementation of the Google partner called Improbable Engineering (https://www.improbable.io/).
The protocol supports unary and streaming calls using protobuf.
It's my choice for the sample app demo.

### Diagram
```
+------------------------------------------------------------------------------------------------+
|                                                                                                |
|                                                                                                |
| +-------------------------+                 +------------------------------------------------+ |
| |                         |                 |                                                | |
| |    +--------------+     |                 |                                                | |
| |    |              |     |            +----+-----+        +----------+         +----------+ | |
| |    |              |     |    Proto   |          | Proto  |          |  Proto  |          | | |
| |    |    JS App    +-----+------------+  envoy   +--------+  gRPC    +---------+  gRPC    | | |
| |    |              |     |            |          |        |  service |         |  service | | |
| |    |              |     |            +----+-----+        +----+-----+         +----------+ | |
| |    +--------------+     |                 |                   |                            | |
| |                         |                 |                   |                            | |
| |  Browser                |                 |                   |               +----------+ | |
| +-------------------------+                 |                   |        Proto  |          | | |
|                                             |                   +---------------+  gRPC    | | |
|                                             |                                   |  service | | |
|                                             |                                   +----------+ | |
|                                             |                                                | |
|                                             |                                                | |
|                                             |                                                | |
|                                             |                                                | |
|  gRPC-Web                                   |                                                | |
|                                             |   Backend                                      | |
|                                             +------------------------------------------------+ |
|                                                                                                |
+------------------------------------------------------------------------------------------------+
```

### Benefits
- enables to create full end-to-end gRPC service architectures
- strongly typed service
- efficient serialization

### Trade-off
- the gRPC-web client still need to be translated into gRPC-friendly calls
- needs a special proxy (Envoy has built in support)

### Run the example app (stream use case)
1. Apply k8s objects
```bash
kubectl apply -f ./k8s-manifests
```
2. Get the gateway address
```bash
kubectl -n istio-system get service istio-ingressgateway \
   -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```
3. Edit your hosts
```
<ip_addr> payment.grpcweb.local
```
   
4. Open the browser with http://payment.grpcweb.local/


## Option 2: google/gRPC-web
Default implementation of the spec. Supports proto and text formats.
 - grpc-web-text: unary and streaming calls
 - grpc-web+proto: only unary calls


## Option 3: gRPC-mate
A dynamic proxy server that translates JSON HTTP requests into gRPC calls.
It is different than grpc-gateway in that it dynamically maps the gRPC service definitions into HTTP endpoints, without having to compile against the Proto definition files and generate code upon service definition updates, like grpc-gateway does.