import { GeneralPostResponse } from "./GeneralResponse";

export interface PaymentsSummaryResponse extends GeneralPostResponse {
    data: {
        ganancias: number;
        pagos: number;
        saldo: number;
    }
}

export interface PaymentsItem {
    valor: number;
    descripcion: string;
    created_at: string;
}

export interface PaymentHistoryItem {
    ganancias: {
        subtotal: number;
        comision: number;
        total: number;
    }
    pagosTotales: number;
    pagos: PaymentsItem[];
    mes: string;
    anio: number;
}

export interface PaymentsResponse extends GeneralPostResponse {
    data: {
        historial: PaymentHistoryItem[];
        total: number;
        take: number;
        skip: number;
    }
}