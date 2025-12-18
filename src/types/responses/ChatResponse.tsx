import { Chat } from "../../models/Chat.model";
import { User } from "../../models/User.model";

export interface ChatItemHome {
    idChat: number;
    cliente: {
        id: number
        fecha_nacimiento: string;
        user: User
    }
    mensaje: string;
    fecha: string;
    unread: number;
}

export interface GetChatsResponse {
    success: boolean;
    message: string;
    data: ChatItemHome[]
    total: number;
}

export interface GetChatMessagesResponse {
    success: boolean;
    message: string;
    data: {
        mensajes: Chat[],
        cliente: ClienteChat,
        primerId: number
    }
}

export interface ClienteChat {
    nombre: string;
    fecha_nacimiento: string;
    user: {
        photo: string;
    }
}