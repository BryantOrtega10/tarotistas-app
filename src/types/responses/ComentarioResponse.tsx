import { User } from "../../models/User.model";
import { GeneralPostResponse } from "./GeneralResponse";

export interface ComentarioItemHome {
    comentario_id: number;
    cliente: User;
    comentario: string;
    respuesta_com?: string;
}

export interface GetComentarioResponse {
    success: boolean;
    message: string;
    data: ComentarioItemHome[]
}

export interface RespuestaComentarioResponse extends GeneralPostResponse { }