import { GetListRequest } from "./GeneralRequest"

export interface GetChatsRequest extends GetListRequest { }

export interface GetChatMessagesRequest {
    before_id?: number;
    take?: number;
}

export interface SendMessageRequest {
    mensaje: string;
}

