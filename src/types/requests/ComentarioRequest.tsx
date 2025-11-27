import { GetListRequest } from "./GeneralRequest"

export interface GetComentariosRequest extends GetListRequest { }

export interface RespuestaComentarioRequest {
    respuesta: string;
}