
export interface ChatNotificationData {
    chatId: number;
    message: string;
}


export interface CallNotificationData {
    relacion_id: number;
    llamada_id: number;
    accion: string;
}
