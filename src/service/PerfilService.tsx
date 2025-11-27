import axios from './AxiosInstance';
import { PERFIL_ENDPOINTS } from './endpoints';
import { EstadoConexionResponse, MiCuentaResponse, MiPerfilResponse, PostMiCuentaResponse } from '../types/responses/PerfilResponse';




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
    }
}