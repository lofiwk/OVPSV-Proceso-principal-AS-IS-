import { Injectable, NotFoundException } from '@nestjs/common';

export type RequestState =
  | 'Creada'
  | 'En revisión'
  | 'Requiere aclaración'
  | 'Revisión completada'
  | 'Recomendación emitida'
  | 'Notificada al Intercesor'
  | 'En negociación'
  | 'Finalizada';

export interface SolicitudValidacion {
  id: string;
  servicioEsencial: string;
  persona: { identificacion: string };
  estado: RequestState;
  contexto: string;
  esValido?: boolean;
  resolucionVinculante?: { esFavorable: boolean };
  recomendacionApoyo?: { descripcion: string };
  actorActual: 'Intercesor' | 'Curador Vital';
  updatedAt: string;
}

@Injectable()
export class RequestsService {
  // Datos simulados (suficiente para "tratar datos" y mostrar estados)
  private requests: SolicitudValidacion[] = [
    {
      id: 'SV-001',
      servicioEsencial: 'Electricidad',
      persona: { identificacion: '12.345.678-9' },
      estado: 'En revisión',
      contexto: 'Solicitud para evitar corte por atraso, persona con discapacidad depende de equipo médico.',
      esValido: undefined,
      recomendacionApoyo: { descripcion: 'Priorizar continuidad del servicio mientras se valida documentación.' },
      actorActual: 'Curador Vital',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'SV-002',
      servicioEsencial: 'Agua',
      persona: { identificacion: '9.876.543-2' },
      estado: 'En negociación',
      contexto: 'Caso validado, se buscan alternativas de pago con proveedor.',
      esValido: true,
      resolucionVinculante: { esFavorable: true },
      recomendacionApoyo: { descripcion: 'Proponer prórroga y plan de pagos sin suspensión del servicio.' },
      actorActual: 'Intercesor',
      updatedAt: new Date().toISOString(),
    },
  ];

  list() {
    return this.requests;
  }

  getById(id: string) {
    const r = this.requests.find(x => x.id === id);
    if (!r) throw new NotFoundException('Solicitud no encontrada');
    return r;
  }

  updateStatus(id: string, estado: RequestState) {
    const r = this.getById(id);
    r.estado = estado;
    r.updatedAt = new Date().toISOString();
    // actorActual "derivado" del estado (simple y defendible)
    r.actorActual =
      estado === 'En negociación' || estado === 'Finalizada' ? 'Intercesor' : 'Curador Vital';
    return r;
  }
}