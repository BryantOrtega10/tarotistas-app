
import Pusher from 'pusher-js';
import { GetChatMessagesRequest, GetChatsRequest, SendMessageRequest } from '../types/requests/ChatRequest';
import { GetChatMessagesResponse, GetChatsResponse } from '../types/responses/ChatResponse';
import { getSecureItem } from '../utils/SecureStorage';
import axios from './AxiosInstance';
import { CHAT_ENDPOINTS } from './endpoints';



export const ChatService = {
    async getChats(request: GetChatsRequest): Promise<GetChatsResponse> {
        try {
            const response = await axios.get<GetChatsResponse>(CHAT_ENDPOINTS.OBTENER_CHATS, {
                params: request
            });
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async getChatMessages(chat_id: number, request: GetChatMessagesRequest): Promise<GetChatMessagesResponse> {
        try {
            const response = await axios.get<GetChatMessagesResponse>(CHAT_ENDPOINTS.MENSAJES_CHAT.replace(`{id}`, chat_id.toString()), {
                params: request
            });
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async postChatMessages(chat_id: number, request: SendMessageRequest): Promise<GetChatMessagesResponse> {
        try {
            const response = await axios.post<GetChatMessagesResponse>(CHAT_ENDPOINTS.MENSAJES_CHAT.replace(`{id}`, chat_id.toString()), request);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async connectToChatChannel(chat_id: number) {
        const userToken = await getSecureItem('access_token');
                

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            },
        });

        const channel = pusher.subscribe(`private-chat.${chat_id}`);

        return channel;
    }
}