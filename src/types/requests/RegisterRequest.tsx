export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
    repeatPassword: string;
    image?: string;
}

export interface CompleteRegisterRequest {
    descripcionCorta?: string;
    horarioInicio?: string;
    horarioFin?: string;
    aniosExp?: string;
    pais?: string;
    especialidades?: { id: number }[];
    terminarRegistro?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface CompleteAccountRequest {
    tipoCuenta?: number;
    cuenta: string;
    banco: number;
}