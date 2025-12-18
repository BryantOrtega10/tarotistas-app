
export interface MiCuentaRequest{
    tipoCuenta?: string;
    cuenta: string;
    banco: string;
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