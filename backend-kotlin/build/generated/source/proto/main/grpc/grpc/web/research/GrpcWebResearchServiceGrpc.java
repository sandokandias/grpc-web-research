package grpc.web.research;

import static io.grpc.MethodDescriptor.generateFullMethodName;
import static io.grpc.stub.ClientCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ClientCalls.asyncClientStreamingCall;
import static io.grpc.stub.ClientCalls.asyncServerStreamingCall;
import static io.grpc.stub.ClientCalls.asyncUnaryCall;
import static io.grpc.stub.ClientCalls.blockingServerStreamingCall;
import static io.grpc.stub.ClientCalls.blockingUnaryCall;
import static io.grpc.stub.ClientCalls.futureUnaryCall;
import static io.grpc.stub.ServerCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ServerCalls.asyncClientStreamingCall;
import static io.grpc.stub.ServerCalls.asyncServerStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnaryCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.33.1)",
    comments = "Source: grpcWebResearch.proto")
public final class GrpcWebResearchServiceGrpc {

  private GrpcWebResearchServiceGrpc() {}

  public static final String SERVICE_NAME = "grpc.web.research.GrpcWebResearchService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<grpc.web.research.GrpcWebResearchRequest,
      grpc.web.research.GrpcWebResearchReply> getSendMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "send",
      requestType = grpc.web.research.GrpcWebResearchRequest.class,
      responseType = grpc.web.research.GrpcWebResearchReply.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<grpc.web.research.GrpcWebResearchRequest,
      grpc.web.research.GrpcWebResearchReply> getSendMethod() {
    io.grpc.MethodDescriptor<grpc.web.research.GrpcWebResearchRequest, grpc.web.research.GrpcWebResearchReply> getSendMethod;
    if ((getSendMethod = GrpcWebResearchServiceGrpc.getSendMethod) == null) {
      synchronized (GrpcWebResearchServiceGrpc.class) {
        if ((getSendMethod = GrpcWebResearchServiceGrpc.getSendMethod) == null) {
          GrpcWebResearchServiceGrpc.getSendMethod = getSendMethod =
              io.grpc.MethodDescriptor.<grpc.web.research.GrpcWebResearchRequest, grpc.web.research.GrpcWebResearchReply>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "send"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  grpc.web.research.GrpcWebResearchRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  grpc.web.research.GrpcWebResearchReply.getDefaultInstance()))
              .setSchemaDescriptor(new GrpcWebResearchServiceMethodDescriptorSupplier("send"))
              .build();
        }
      }
    }
    return getSendMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static GrpcWebResearchServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceStub>() {
        @java.lang.Override
        public GrpcWebResearchServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GrpcWebResearchServiceStub(channel, callOptions);
        }
      };
    return GrpcWebResearchServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static GrpcWebResearchServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceBlockingStub>() {
        @java.lang.Override
        public GrpcWebResearchServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GrpcWebResearchServiceBlockingStub(channel, callOptions);
        }
      };
    return GrpcWebResearchServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static GrpcWebResearchServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<GrpcWebResearchServiceFutureStub>() {
        @java.lang.Override
        public GrpcWebResearchServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new GrpcWebResearchServiceFutureStub(channel, callOptions);
        }
      };
    return GrpcWebResearchServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class GrpcWebResearchServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void send(grpc.web.research.GrpcWebResearchRequest request,
        io.grpc.stub.StreamObserver<grpc.web.research.GrpcWebResearchReply> responseObserver) {
      asyncUnimplementedUnaryCall(getSendMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getSendMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                grpc.web.research.GrpcWebResearchRequest,
                grpc.web.research.GrpcWebResearchReply>(
                  this, METHODID_SEND)))
          .build();
    }
  }

  /**
   */
  public static final class GrpcWebResearchServiceStub extends io.grpc.stub.AbstractAsyncStub<GrpcWebResearchServiceStub> {
    private GrpcWebResearchServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GrpcWebResearchServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GrpcWebResearchServiceStub(channel, callOptions);
    }

    /**
     */
    public void send(grpc.web.research.GrpcWebResearchRequest request,
        io.grpc.stub.StreamObserver<grpc.web.research.GrpcWebResearchReply> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSendMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class GrpcWebResearchServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<GrpcWebResearchServiceBlockingStub> {
    private GrpcWebResearchServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GrpcWebResearchServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GrpcWebResearchServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public grpc.web.research.GrpcWebResearchReply send(grpc.web.research.GrpcWebResearchRequest request) {
      return blockingUnaryCall(
          getChannel(), getSendMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class GrpcWebResearchServiceFutureStub extends io.grpc.stub.AbstractFutureStub<GrpcWebResearchServiceFutureStub> {
    private GrpcWebResearchServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected GrpcWebResearchServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new GrpcWebResearchServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<grpc.web.research.GrpcWebResearchReply> send(
        grpc.web.research.GrpcWebResearchRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getSendMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_SEND = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final GrpcWebResearchServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(GrpcWebResearchServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_SEND:
          serviceImpl.send((grpc.web.research.GrpcWebResearchRequest) request,
              (io.grpc.stub.StreamObserver<grpc.web.research.GrpcWebResearchReply>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class GrpcWebResearchServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    GrpcWebResearchServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return grpc.web.research.GrpcWebResearch.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("GrpcWebResearchService");
    }
  }

  private static final class GrpcWebResearchServiceFileDescriptorSupplier
      extends GrpcWebResearchServiceBaseDescriptorSupplier {
    GrpcWebResearchServiceFileDescriptorSupplier() {}
  }

  private static final class GrpcWebResearchServiceMethodDescriptorSupplier
      extends GrpcWebResearchServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    GrpcWebResearchServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (GrpcWebResearchServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new GrpcWebResearchServiceFileDescriptorSupplier())
              .addMethod(getSendMethod())
              .build();
        }
      }
    }
    return result;
  }
}
