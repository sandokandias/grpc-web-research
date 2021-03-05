FROM node:14.16.0 as builder

WORKDIR /src
COPY . .
RUN rm -rf node_modules

RUN npm install
RUN npx webpack ./client.js

FROM python:2.7
WORKDIR /frontend
COPY --from=builder /src/ .
ENTRYPOINT [ "python" ]
CMD [ "-m", "SimpleHTTPServer", "9001" ]
EXPOSE 9001