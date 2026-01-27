import { Llamada } from "../../models/Llamada.model";

export interface PostCallResponse {
    success: boolean;
    message: string;
    data: {
        llamada: Llamada
    }
}
