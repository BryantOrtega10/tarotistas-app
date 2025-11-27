
import { GetChatsRequest } from '../types/requests/ChatRequest';
import { GetChatsResponse } from '../types/responses/ChatResponse';
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
}