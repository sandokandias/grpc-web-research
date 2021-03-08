FROM node:14.16.0 as builder

WORKDIR /frontend
COPY ./frontend/ ./
RUN rm -rf node_modules

RUN npm install
RUN npx webpack ./client.js

FROM nginx:latest
COPY --from=builder /frontend/ /usr/share/nginx/html/