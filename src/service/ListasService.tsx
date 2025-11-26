import axios from './AxiosInstance';
import { LISTAS_ENDPOINT } from './endpoints';
import { EspecialidadesResponse, PaisesResponse } from '../types/responses/ListasResponse';



export const ListasService = {
    async getPaises(): Promise<PaisesResponse> {
        try {
            const response = await axios.get<PaisesResponse>(LISTAS_ENDPOINT.PAISES);
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
            const response = await axios.get<EspecialidadesResponse>(LISTAS_ENDPOINT.ESPECIALIDADES);
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