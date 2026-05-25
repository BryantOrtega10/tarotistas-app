
export interface MiCuentaRequest{
    tipoCuenta?: number;
    cuenta: string;
    banco: number;
}

export interface ActualizarPerfilRequest{
    nombre: string;
    email: string;
    photo?: string;
    descripcionCorta?: string;
    horarioInicio?: string;
    horarioFin?: string;
    aniosExp?: string;
    pais?: string;
    especialidades?: { id: number }[];
}