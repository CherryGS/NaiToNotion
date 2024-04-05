export enum MessageType {
  ImgUploadingMsg,
}

export interface BaseMsg {
  id?: string;
}
export interface ImgUploadMsg extends BaseMsg {
  type: MessageType.ImgUploadingMsg;
  url: string;
}

export interface ImgResponse<T> {
  result: true | false;
  rawMsg: T;
  rawErr?: string;
}
