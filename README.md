# grpc-consumer-research
R&amp;D about how to consume grpc services by traditional http clients running on browser.


## Dependency tools that you need to nstall:
 - docker (https://www.docker.com/)
 - k3d (https://k3d.io/)
 - istioctl (https://istio.io/latest/docs/setup/getting-started/#download)
  

## Cluster setup
1. Create the k3d cluster
k3d cluster create my-multinode-cluster \
    --servers 1 --agents 3 --port 9080:80@loadbalancer \
    --port 9443:443@loadbalancer --api-port 6443 --k3s-server-arg '--no-deploy=traefik'

2. Install istio on cluster
istioctl install --set profile=default

3. Enable automatic istio injection
kubectl label namespace default istio-injection=enabled

## Option 1: grpc-web
3. Deploy backend with istio inject
kubectl apply -f <(istioctl kube-inject -f backend.yml)

4. Create istio gateway
kubectl apply -f istio-gateway.yml

5. Deploys frontend
kubectl apply -f frontend.yml