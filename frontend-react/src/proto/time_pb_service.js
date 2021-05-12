// package: proto
// file: time.proto

var time_pb = require("./time_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TimeService = (function () {
  function TimeService() {}
  TimeService.serviceName = "proto.TimeService";
  return TimeService;
}());

TimeService.get_time = {
  methodName: "get_time",
  service: TimeService,
  requestStream: false,
  responseStream: false,
  requestType: time_pb.TimeRequest,
  responseType: time_pb.TimeResponse
};

exports.TimeService = TimeService;

function TimeServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TimeServiceClient.prototype.get_time = function get_time(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TimeService.get_time, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TimeServiceClient = TimeServiceClient;

