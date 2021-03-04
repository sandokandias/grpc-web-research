/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.proto = require('./time_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.TimeServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.TimeServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.TimeRequest,
 *   !proto.proto.TimeResponse>}
 */
const methodDescriptor_TimeService_get_time = new grpc.web.MethodDescriptor(
  '/proto.TimeService/get_time',
  grpc.web.MethodType.UNARY,
  proto.proto.TimeRequest,
  proto.proto.TimeResponse,
  /**
   * @param {!proto.proto.TimeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.TimeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.TimeRequest,
 *   !proto.proto.TimeResponse>}
 */
const methodInfo_TimeService_get_time = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.TimeResponse,
  /**
   * @param {!proto.proto.TimeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.TimeResponse.deserializeBinary
);


/**
 * @param {!proto.proto.TimeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.TimeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.TimeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TimeServiceClient.prototype.get_time =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TimeService/get_time',
      request,
      metadata || {},
      methodDescriptor_TimeService_get_time,
      callback);
};


/**
 * @param {!proto.proto.TimeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.TimeResponse>}
 *     Promise that resolves to the response
 */
proto.proto.TimeServicePromiseClient.prototype.get_time =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TimeService/get_time',
      request,
      metadata || {},
      methodDescriptor_TimeService_get_time);
};


module.exports = proto.proto;

