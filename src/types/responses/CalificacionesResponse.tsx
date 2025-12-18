import { User } from "../../models/User.model";
import { GeneralPostResponse } from "./GeneralResponse";

export interface CalificacionItem {
    cliente: User;
    fecha: string;
    calificacion: number;
}

export interface GetCalificacionResponse {
    success: boolean;
    message: string;
    data: CalificacionItem[]
    total?: number;
}

export interface RespuestaComentarioResponse extends GeneralPostResponse { }