import { Especialidad } from "../../models/Especialidad.model";

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
