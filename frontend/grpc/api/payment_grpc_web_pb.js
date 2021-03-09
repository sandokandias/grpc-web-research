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
proto.proto = require('./payment_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.PaymentServiceClient =
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
proto.proto.PaymentServicePromiseClient =
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
 *   !proto.proto.PayRequest,
 *   !proto.proto.PayResponse>}
 */
const methodDescriptor_PaymentService_pay = new grpc.web.MethodDescriptor(
  '/proto.PaymentService/pay',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.PayRequest,
  proto.proto.PayResponse,
  /**
   * @param {!proto.proto.PayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.PayResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.PayRequest,
 *   !proto.proto.PayResponse>}
 */
const methodInfo_PaymentService_pay = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.PayResponse,
  /**
   * @param {!proto.proto.PayRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.PayResponse.deserializeBinary
);


/**
 * @param {!proto.proto.PayRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.PayResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.PaymentServiceClient.prototype.pay =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.PaymentService/pay',
      request,
      metadata || {},
      methodDescriptor_PaymentService_pay);
};


/**
 * @param {!proto.proto.PayRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.PayResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.PaymentServicePromiseClient.prototype.pay =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.PaymentService/pay',
      request,
      metadata || {},
      methodDescriptor_PaymentService_pay);
};


module.exports = proto.proto;

