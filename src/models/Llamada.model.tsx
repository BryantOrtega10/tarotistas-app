import { ClienteTarotista } from "./ClienteTarotista.model";
import { Pago } from "./Pago.model";

export interface Llamada {
  id: number;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  tarifa?: number | null;
  por_comision?: number | null;
  tiempo_mins?: number | null;
  subtotal?: number | null;
  comision?: number | null;
  total?: number | null;
  estado_llamada?: number;
  estado_pago_cli?: number;
  estado_pago_tar?: number;
  respuesta_payu?: string | null;
  calificacion?: number | null;
  comentario?: string | null;
  respuesta_com?: string | null;
  fk_cliente_tarotista: number;
  fk_pago?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  type?: string | null;
  

  // Relaciones
  cliente_tarotista?: ClienteTarotista;
  pago?: Pago | null;
}