import { Chat } from "../types/models/Chat";
import { Cliente } from "./Cliente.model";
import { Llamada } from "./Llamada.model";
import { Tarotista } from "./Tarotista.model";

export interface ClienteTarotista {
  id: number;
  mensajes_gratis?: number;
  fk_cliente: number;
  fk_tarotista: number;

  // Relaciones
  cliente?: Cliente;
  tarotista?: Tarotista;
  chats?: Chat[];
  llamadas?: Llamada[];
}
