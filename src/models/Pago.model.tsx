import { User } from "../types/models/User";
import { Llamada } from "./Llamada.model";
import { Tarotista } from "./Tarotista.model";

export interface Pago {
  id: number;
  valor: number;
  descripcion: string;
  fk_entry_user: number;
  fk_tarotista: number;
  created_at?: string | null;
  updated_at?: string | null;

  // Relaciones
  entry_user?: User;
  tarotista?: Tarotista;
  llamadas?: Llamada[];
}