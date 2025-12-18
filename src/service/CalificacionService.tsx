
import { GetCalificacionesRequest } from '../types/requests/CalificacionesRequest';
import { GetComentariosRequest, RespuestaComentarioRequest } from '../types/requests/ComentarioRequest';
import { GetCalificacionResponse } from '../types/responses/CalificacionesResponse';
import { GetComentarioResponse, RespuestaComentarioResponse } from '../types/responses/ComentarioResponse';
import axios from './AxiosInstance';
import { CALIFICACIONES_ENDPOINTS, COMENTARIO_ENDPOINTS } from './endpoints';



export const CalificacionService = {
    async getCalificaciones(request: GetCalificacionesRequest): Promise<GetCalificacionResponse> {
        try {
            const response = await axios.get<GetCalificacionResponse>(CALIFICACIONES_ENDPOINTS.OBTENER_CALIFICACIONES, {
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