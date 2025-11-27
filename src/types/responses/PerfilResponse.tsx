import { Especialidad } from "../../models/Especialidad.model";
import { GeneralPostResponse } from "./GeneralResponse";

export interface MiPerfilResponse{
    success: boolean;
    message: string;
    data: {
        nombre: string;
        photo: string;
        descripcion_corta: string;
        anios_exp: string;
        pais_id: string;
        horario_inicio: string;
        horario_fin: string;
        especialidades: Especialidad[];
    }    
}


export interface MiCuentaResponse{
    success: boolean;
    message: string;
    data: {
        tipo_cuenta?: number;
        cuenta?: string;
        banco_id?: number;
    }    
}

export interface EstadoConexionResponse{
    success: boolean;
    message: string;
    data: {
        conexion_status: number;
    }    
}



export interface PostMiCuentaResponse extends GeneralPostResponse {}
