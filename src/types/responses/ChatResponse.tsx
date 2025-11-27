import { User } from "../../models/User.model";

export interface ChatItemHome {
    idChat: number;
    cliente: User;
    mensaje: string;
    fecha: string;
}

export interface GetChatsResponse {
    success: boolean;
    message: string;
    data: ChatItemHome[]
}