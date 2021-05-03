// package: proto
// file: payment.proto

var payment_pb = require("./payment_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PaymentService = (function () {
  function PaymentService() {}
  PaymentService.serviceName = "proto.PaymentService";
  return PaymentService;
}());

PaymentService.pay = {
  methodName: "pay",
  service: PaymentService,
  requestStream: false,
  responseStream: true,
  requestType: payment_pb.PayRequest,
  responseType: payment_pb.PayResponse
};

exports.PaymentService = PaymentService;

function PaymentServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PaymentServiceClient.prototype.pay = function pay(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PaymentService.pay, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.PaymentServiceClient = PaymentServiceClient;

