import { User } from "../types/models/User";
import { Banco } from "./Banco.model";
import { ClienteTarotista } from "./ClienteTarotista.model";
import { EspecialidadTarotista } from "./EspecialidadTarotista.model";
import { Pais } from "./Pais.model";

export interface Tarotista {
  id: number;
  nombre: string;
  descripcion_corta?: string | null;
  estado?: number;
  estado_conexion?: number;
  horario?: string | null;
  anios_exp?: string | null;
  calificacion?: number | null;
  saldo?: number | null;
  tipo_cuenta?: string | null;
  cuenta?: string | null;

  fk_banco?: number | null;
  fk_pais?: number | null;
  fk_user: number;


  // Relaciones
  banco?: Banco | null;
  pais?: Pais | null;
  user?: User;

  especialidades?: EspecialidadTarotista[];
  clientes?: ClienteTarotista[];
}