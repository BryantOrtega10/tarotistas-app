import { User } from "../types/models/User";
import { ClienteTarotista } from "./ClienteTarotista.model";

export interface Cliente {
  id: number;
  nombre: string;
  fecha_nacimiento?: string | null;
  fk_user: number;

  // Relaciones
  user?: User;
  tarotistas?: ClienteTarotista[];
}