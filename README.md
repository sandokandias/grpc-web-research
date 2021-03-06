# grpc-consumer-research
R&amp;D about how to consume grpc services by traditional http clients running on browser.

Will be presented 2 options of architecture: 
 - grpc-web protocol (https://grpc.io/docs/platforms/web/)
 - custom BFF (Backend For Frontend) exposing HTPP and consuming GRPC

## Tools must be installed:
 - docker (https://docs.docker.com/engine/install/)
 - kubectl (https://kubernetes.io/docs/tasks/tools/)
 - k3d (https://k3d.io/)
 - istioctl (https://istio.io/latest/docs/setup/getting-started)

## Cluster setup
1. Create the k3d cluster
```bash
$ k3d cluster create multinode-cluster \
    --servers 1 --agents 3 --port 9080:80@loadbalancer \
    --port 9443:443@loadbalancer --api-port 6443 --k3s-server-arg '--no-deploy=traefik'
```
2. Install istio on cluster
```bash
$ istioctl install --set profile=demo
```
3. Enable automatic istio injection
```bash
$ kubectl label namespace default istio-injection=enabled
```
4. Install kiali and addons (optional)
```bash
kubectl apply -f <istio_dir>/samples/addons
```
5. Kiali dashboad (optional)
```bash
$ istioctl dashboard kiali
``` 

## Cluster down
```bash
$ k3d cluster stop multinode-cluster && k3d cluster delete multinode-cluster
```

## Option 1: grpc-web protocol
### app graph
![alt text](https://github.com/sandokandias/grpc-consumer-research/blob/main/docs/grpc-web-diagram.png?raw=true)

### benefits

### cons

### How to play
1. Apply k8s objects
```bash
$ kubectl apply -f ./k8s-manifests
```
2. Get the gateway address
```bash
$ kubectl -n istio-system get service istio-ingressgateway \
   -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```
3. Open the browser with http://<gateway_address>/ and make some requests


## Option 2: custom BFF (Backend For Frontend) exposing HTPP and consuming GRPC