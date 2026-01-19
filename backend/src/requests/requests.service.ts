import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  SolicitudProteccion, 
  SolicitudProteccionDocument 
} from './schemas/solicitud-proteccion.schema';
import {
  Negociacion,
  NegociacionDocument
} from './schemas/negociacion.schema';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(SolicitudProteccion.name) 
    private solicitudModel: Model<SolicitudProteccionDocument>,
    @InjectModel(Negociacion.name)
    private negociacionModel: Model<NegociacionDocument>,
  ) {}

  // CU1: Crear solicitud de protección
  async crearSolicitud(datos: any): Promise<SolicitudProteccion> {
    const nuevaSolicitud = new this.solicitudModel({
      ...datos,
      estado: 'Creada',
      actorActual: 'Curador Vital'
    });
    return nuevaSolicitud.save();
  }

  // Listar todas las solicitudes
  async listarSolicitudes(): Promise<SolicitudProteccion[]> {
    return this.solicitudModel.find().exec();
  }

  // Obtener una solicitud por ID
  async obtenerSolicitud(id: string): Promise<SolicitudProteccion> {
    const solicitud = await this.solicitudModel.findById(id).exec();
    if (!solicitud) {
      throw new NotFoundException(`Solicitud ${id} no encontrada`);
    }
    return solicitud;
  }

  // Actualizar estado de solicitud
  async actualizarEstado(id: string, nuevoEstado: string): Promise<SolicitudProteccion> {
    const solicitud = await this.solicitudModel.findByIdAndUpdate(
      id,
      { 
        estado: nuevoEstado,
        actorActual: this.determinarActor(nuevoEstado)
      },
      { new: true }
    ).exec();
    
    if (!solicitud) {
      throw new NotFoundException(`Solicitud ${id} no encontrada`);
    }
    return solicitud;
  }

  // CU2: Crear negociación
  async crearNegociacion(solicitudId: string, datos: any): Promise<Negociacion> {
    const solicitud = await this.obtenerSolicitud(solicitudId);
    
    const nuevaNegociacion = new this.negociacionModel({
      solicitudId,
      intercesor: datos.intercesor,
      propuestaEnviada: datos.propuesta,
      fechaEnvio: new Date(),
      estadoNegociacion: 'En espera',
      numeroIntento: datos.numeroIntento || 1
    });

    // Actualizar estado de la solicitud
    await this.actualizarEstado(solicitudId, 'En negociación');

    return nuevaNegociacion.save();
  }

  // Obtener negociaciones de una solicitud
  async obtenerNegociaciones(solicitudId: string): Promise<Negociacion[]> {
    return this.negociacionModel
      .find({ solicitudId })
      .sort({ createdAt: -1 })
      .exec();
  }

  // Registrar respuesta del proveedor
  async registrarRespuestaProveedor(
    negociacionId: string, 
    respuesta: string,
    aceptada: boolean
  ): Promise<Negociacion> {
    const negociacion = await this.negociacionModel.findByIdAndUpdate(
      negociacionId,
      {
        respuestaProveedor: respuesta,
        estadoNegociacion: aceptada ? 'Aceptada' : 'Rechazada',
        fechaRespuesta: new Date()
      },
      { new: true }
    ).exec();

    if (!negociacion) {
      throw new NotFoundException('Negociación no encontrada');
    }

    // Si fue aceptada, finalizar solicitud
    if (aceptada) {
      await this.actualizarEstado(
        negociacion.solicitudId.toString(), 
        'Finalizada'
      );
    }

    return negociacion;
  }

  private determinarActor(estado: string): string {
    const mapeo = {
      'Creada': 'Curador Vital',
      'En revisión': 'Curador Vital',
      'Requiere aclaración': 'PcD',
      'Revisión completada': 'Curador Vital',
      'Recomendación emitida': 'Curador Vital',
      'Notificada al Intercesor': 'Intercesor',
      'En negociación': 'Intercesor',
      'Finalizada': 'Sistema'
    };
    return mapeo[estado] || 'Curador Vital';
  }
}