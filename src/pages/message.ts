export enum MessageType {
  ImgUrl,
}

export interface ImgUploadMsg {
  type: MessageType.ImgUrl;
  url: string;
}

export interface ImgResponse<T> {
  result: true | false;
  rawMsg: T;
}
