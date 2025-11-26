import { EspecialidadTarotista } from "./EspecialidadTarotista.model";

export interface Especialidad {
  id: number;
  nombre: string;

  // Relaciones
  especialidades_tarotistas?: EspecialidadTarotista[];
}

