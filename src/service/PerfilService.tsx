import axios from './AxiosInstance';
import { PERFIL_ENDPOINT } from './endpoints';
import { MiPerfilResponse } from '../types/responses/PerfilResponse';



export const PerfilService = {
    async getMiPerfil(): Promise<MiPerfilResponse> {
        try {
            const response = await axios.get<MiPerfilResponse>(PERFIL_ENDPOINT.MIPERFIL);
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