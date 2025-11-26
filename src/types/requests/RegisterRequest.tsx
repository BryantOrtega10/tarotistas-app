export interface RegisterRequest{
    nombre: string;
    email: string;
    password: string;
    repeatPassword: string;
    image?: string;
}

export interface CompleteRegisterRequest{
    descripcionCorta?: string;
    horarioInicio?: string;
    horarioFin?: string;
    aniosExp?: string;
    pais?: string;
    especialidades?: {id: string}[];
}

export interface LoginRequest{
    email: string;
    password: string;
}