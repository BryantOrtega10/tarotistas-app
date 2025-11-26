import { Pais } from "./Pais.model";

export interface Banco {
    id: number;
    nombre: string;
    ap_tipo_cuenta: boolean;
    fk_pais: number;
    // Relaciones
    pais?: Pais;
}