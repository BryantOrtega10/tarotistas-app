
import Pusher from 'pusher-js';

import { getSecureItem } from '../utils/SecureStorage';
import axios from './AxiosInstance';
import { LLAMADAS_ENDPOINTS } from './endpoints';
import { PostCallResponse } from '../types/responses/CallResponse';



export const CallService = {
    async postTerminarSegmento(idLlamada: number): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.TERMINAR_SEGMENTO.replace(`{idLlamada}`, idLlamada.toString()));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async getLlamada(call_id: number): Promise<PostCallResponse> {
        try {
            const response = await axios.get<PostCallResponse>(LLAMADAS_ENDPOINTS.DETALLE.replace(`{idLlamada}`, call_id.toString()));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }

    },
    async getLlamadaActiva(): Promise<PostCallResponse> {
        try {
            const response = await axios.get<PostCallResponse>(LLAMADAS_ENDPOINTS.ACTIVA);
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async postAcceptCall(call_id: number): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.ACEPTAR.replace(`{idLlamada}`, call_id.toString()));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async postRejectCall(call_id: number): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.RECHAZAR.replace(`{idLlamada}`, call_id.toString()));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async postSendOffer(call_id: number, offer: RTCSessionDescriptionInit): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.SEND_OFFER.replace(`{idLlamada}`, call_id.toString()),{
                'offer': offer
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
    async postIce(call_id: number, candidate: RTCIceCandidate): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.ICE.replace(`{idLlamada}`, call_id.toString()),{
                'candidate': candidate
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
    async postAnswer(call_id: number, answer: RTCSessionDescriptionInit): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.ANSWER.replace(`{idLlamada}`, call_id.toString()),{
                'answer': answer
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
    async postFinalizar(call_id: number): Promise<PostCallResponse> {
        try {
            const response = await axios.post<PostCallResponse>(LLAMADAS_ENDPOINTS.FINALIZAR.replace(`{idLlamada}`, call_id.toString()));
            return response.data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                error?.message ??
                "Error desconocido."
            );
        }
    },
    async connectToCallChannel(call_id: number) {
        const userToken = await getSecureItem('access_token');
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            },
        });

        const channel = pusher.subscribe(`private-llamada.${call_id}`);

        return channel;
    }
}