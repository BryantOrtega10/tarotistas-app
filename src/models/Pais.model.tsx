import { Banco } from "./Banco.model";

export interface Pais {
  id: number;
  nombre: string;
  bandera: string;
  // Relaciones
  bancos?: Banco[];
}

