import { Especialidad } from "./Especialidad.model";
import { Tarotista } from "./Tarotista.model";

export interface EspecialidadTarotista {
  id: number;
  fk_especialidad: number;
  fk_tarotista: number;

  // Relaciones
  especialidad?: Especialidad;
  tarotista?: Tarotista;
}