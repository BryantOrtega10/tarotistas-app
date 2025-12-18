import { Client } from "./Cliente";

export type Chat = {
    idChat: number;
    client: Client;
    messages: Message[];
    lastMessage: string;
    unReadCount: number;
    lastMessageDate: string;
};

export type Message = {
    id: number;
    sender: SenderTypes;
    message: string;
    created_at?: string | null;
}

export enum SenderTypes {
    TAROTISTA = "tarotista",
    CLIENTE = "cliente",
}