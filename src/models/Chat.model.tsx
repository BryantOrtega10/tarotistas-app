import { ClienteTarotista } from "./ClienteTarotista.model";

export interface Chat {
  id: number;
  mensaje: string;
  origen: number;
  tipo: number;
  leido?: string | null;
  fk_cliente_tarotista: number;
  created_at?: string | null;
  updated_at?: string | null;

  // Relaciones
  cliente_tarotista?: ClienteTarotista;
}
