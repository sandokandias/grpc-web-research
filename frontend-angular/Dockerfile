FROM node:14.16.0 as builder

WORKDIR /frontend-angular
COPY ./frontend-angular/ ./
RUN rm -rf node_modules

RUN npm install

RUN $(npm bin)/ng build --prod --output-path=dist

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /frontend-angular/dist /usr/share/nginx/html