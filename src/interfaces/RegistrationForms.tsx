export interface RegistrationForm1 {
    nombre: string;
    correo: string;
    pass: string;
    r_pass: string;
    image: string;
}

export interface RegistrationForm2 {
    anios: string;
    pais: string;
    especialidades: string[];
    hora_i: string;
    hora_f: string;
    descripcion: string;
}

export interface LoginForm {
    email: string;
    password: string;
}