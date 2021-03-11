// package: proto
// file: payment.proto

import * as jspb from "google-protobuf";

export class PayRequest extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PayRequest): PayRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayRequest;
  static deserializeBinaryFromReader(message: PayRequest, reader: jspb.BinaryReader): PayRequest;
}

export namespace PayRequest {
  export type AsObject = {
    amount: number,
    description: string,
  }
}

export class PayResponse extends jspb.Message {
  getPayid(): string;
  setPayid(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getDatetime(): string;
  setDatetime(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PayResponse): PayResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayResponse;
  static deserializeBinaryFromReader(message: PayResponse, reader: jspb.BinaryReader): PayResponse;
}

export namespace PayResponse {
  export type AsObject = {
    payid: string,
    status: string,
    datetime: string,
  }
}

