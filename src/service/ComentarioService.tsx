
import { GetComentariosRequest, RespuestaComentarioRequest } from '../types/requests/ComentarioRequest';
import { GetComentarioResponse, RespuestaComentarioResponse } from '../types/responses/ComentarioResponse';
import axios from './AxiosInstance';
import { COMENTARIO_ENDPOINTS } from './endpoints';



export const ComentarioService = {
    async getComentarios(request: GetComentariosRequest): Promise<GetComentarioResponse> {
        try {
            const response = await axios.get<GetComentarioResponse>(COMENTARIO_ENDPOINTS.OBTENER_COMENTARIO, {
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
    async postResponderComentario(comment_id: number, request: RespuestaComentarioRequest): Promise<RespuestaComentarioResponse> {
        try {
            const response = await axios.post<RespuestaComentarioResponse>(COMENTARIO_ENDPOINTS.RESPONDER_COMENTARIO.replace(`{id}`,comment_id.toString()), request);
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