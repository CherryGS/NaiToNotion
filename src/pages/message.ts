export enum MessageType {
  ImgUrl
}

interface BaseMessage {
  type: MessageType;
}

export interface ImgUrl extends BaseMessage {
  type: MessageType.ImgUrl;
  url: string;
}

export interface BaseResponse {
  status: true | false;
}
