import { Banco } from "../../models/Banco.model";
import { Especialidad } from "../../models/Especialidad.model";
import { Pais } from "../../models/Pais.model";

export interface PaisesResponse{
    success: boolean;
    message: string;
    data: {
        paises: Pais[];
    }    
}

export interface EspecialidadesResponse{
    success: boolean;
    message: string;
    data: {
        especialidades: Especialidad[];
    }    
}

export interface BancosResponse{
    success: boolean;
    message: string;
    data: {
        bancos: Banco[];
    }    
}