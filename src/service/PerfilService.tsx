import axios from './AxiosInstance';
import { PERFIL_ENDPOINTS } from './endpoints';
import { ActualizarPerfilResponse, EstadoConexionResponse, MiCuentaResponse, MiPerfilResponse, PostMiCuentaResponse } from '../types/responses/PerfilResponse';
import { ActualizarPerfilRequest, MiCuentaRequest } from '../types/requests/PerfilRequest';
import { base64ToBlob } from '../utils/base64ToBlob';
import { GeneralPostResponse } from '../types/responses/GeneralResponse';




export const PerfilService = {
    async getMiPerfil(): Promise<MiPerfilResponse> {
        try {
            const response = await axios.get<MiPerfilResponse>(PERFIL_ENDPOINTS.MI_PERFIL);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async getMiCuenta(): Promise<MiCuentaResponse> {
        try {
            const response = await axios.get<MiCuentaResponse>(PERFIL_ENDPOINTS.MI_CUENTA);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async postMiCuenta(request: MiCuentaRequest): Promise<GeneralPostResponse> {
        try {
            const response = await axios.post<MiCuentaResponse>(PERFIL_ENDPOINTS.MI_CUENTA, request);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async getEstadoConexion(): Promise<EstadoConexionResponse> {
        try {
            const response = await axios.get<EstadoConexionResponse>(PERFIL_ENDPOINTS.ESTADO_CONEXION);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async postEstadoConexion(status: boolean): Promise<EstadoConexionResponse> {
        try {
            const response = await axios.post<EstadoConexionResponse>(PERFIL_ENDPOINTS.CAMBIAR_ESTADO_CONEXION.replace(`{status}`, status ? '3' : '1'));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async putActualizarPerfil(request: ActualizarPerfilRequest): Promise<ActualizarPerfilResponse> {
        try {
            const formData = new FormData();
            formData.append('nombre', request.nombre);
            formData.append('email', request.email);
            formData.append('descripcionCorta', request.descripcionCorta ?? "");
            formData.append('horarioInicio', request.horarioInicio ?? "");
            formData.append('horarioFin', request.horarioFin ?? "");
            formData.append('aniosExp', request.aniosExp ?? "");
            formData.append('pais', request.pais ?? "");
            formData.append('especialidades', JSON.stringify(request.especialidades));
            
            if (request.photo) {
                const contentType = request.photo.match(/^data:(.*);base64/)?.[1] || 'image/jpeg';
                const blob = base64ToBlob(request.photo, contentType);
                formData.append('photo', blob, 'photo.jpg');
            }
            const response = await axios.post<ActualizarPerfilResponse>(PERFIL_ENDPOINTS.MI_PERFIL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    }
}