# gRPC-consumer-research
R&amp;D about how to consume gRPC services by traditional http clients.

Will be presented 2 options of architecture: 
 - gRPC-web protocol for browser clients (https://grpc.io/docs/platforms/web/)
 - gRPC-mate

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

## Option 1: gRPC-web protocol
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
| |  Browser   HTTP1        |                 |                   |               +----------+ | |
| +-------------------------+                 |                   |        Proto  |          | | |
|                                             |                   +---------------+  gRPC    | | |
|                                             |                                   |  service | | |
|                                             |                                   +----------+ | |
|                                             |                                                | |
|                                             |                                                | |
|                                             |                                                | |
|                                             |                                                | |
|  gRPC-Web                                   |                                                | |
|                                             |   Backend       HTTP2                          | |
|                                             +------------------------------------------------+ |
|                                                                                                |
+------------------------------------------------------------------------------------------------+
```

### Benefits
- enables to create full end-to-end gRPC service architectures
- strongly typed service
- efficient serialization

### Cons
- the gRPC-web client still need to be translated into gRPC-friendly calls
- needs a special proxy (Envoy has built in support)

### Example app
1. Apply k8s objects
```bash
kubectl apply -f ./k8s-manifests
```
2. Get the gateway address
```bash
kubectl -n istio-system get service istio-ingressgateway \
   -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```
3. Open the browser with http://<gateway_address>/ and make some requests


## Option 2: grpc-mate