import { GetListRequest } from '../types/requests/GeneralRequest';
import { PaymentsResponse, PaymentsSummaryResponse } from '../types/responses/PaymentsResponse';
import axios from './AxiosInstance';
import { PAYMENTS_ENDPOINTS } from './endpoints';



export const PaymentsService = {
    async getPaymentsSummary(): Promise<PaymentsSummaryResponse> {
        try {
            const response = await axios.get<PaymentsSummaryResponse>(PAYMENTS_ENDPOINTS.OBTENER_RESUMEN);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async getPayments(request: GetListRequest): Promise<PaymentsResponse> {
        try {
            const response = await axios.get<PaymentsResponse>(PAYMENTS_ENDPOINTS.OBTENER_PAGOS, {
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