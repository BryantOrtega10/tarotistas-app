import axios from './AxiosInstance';
import { LISTAS_ENDPOINTS } from './endpoints';
import { BancosResponse, EspecialidadesResponse, PaisesResponse } from '../types/responses/ListasResponse';



export const ListasService = {
    async getPaises(): Promise<PaisesResponse> {
        try {
            const response = await axios.get<PaisesResponse>(LISTAS_ENDPOINTS.PAISES);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido al solicitar la URL de Okta."
            );
        }

    },
    async getEspecialidades(): Promise<EspecialidadesResponse> {
        try {
            const response = await axios.get<EspecialidadesResponse>(LISTAS_ENDPOINTS.ESPECIALIDADES);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido al solicitar la URL de Okta."
            );
        }

    },
    async getBancos(): Promise<BancosResponse> {
        try {
            const response = await axios.get<BancosResponse>(LISTAS_ENDPOINTS.BANCOS);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido al solicitar la URL de Okta."
            );
        }

    },
}