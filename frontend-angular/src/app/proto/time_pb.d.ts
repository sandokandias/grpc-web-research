// package: proto
// file: time.proto

import * as jspb from "google-protobuf";

export class TimeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TimeRequest): TimeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimeRequest;
  static deserializeBinaryFromReader(message: TimeRequest, reader: jspb.BinaryReader): TimeRequest;
}

export namespace TimeRequest {
  export type AsObject = {
  }
}

export class TimeResponse extends jspb.Message {
  getUnix(): number;
  setUnix(value: number): void;

  getUtc(): string;
  setUtc(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TimeResponse): TimeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimeResponse;
  static deserializeBinaryFromReader(message: TimeResponse, reader: jspb.BinaryReader): TimeResponse;
}

export namespace TimeResponse {
  export type AsObject = {
    unix: number,
    utc: string,
  }
}

