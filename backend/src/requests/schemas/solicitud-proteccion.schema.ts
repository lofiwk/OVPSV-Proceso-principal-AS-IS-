import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SolicitudProteccionDocument = SolicitudProteccion & Document;

@Schema({ timestamps: true })
export class SolicitudProteccion {
  @Prop({ required: true })
  identificacionPcD: string;

  @Prop({ required: true })
  servicioEsencial: string; // "Electricidad", "Agua", "Gas", etc.

  @Prop({ 
    type: String,
    enum: ['Creada', 'En Revisión', 'Requiere aclaración', 'Revisión completada', 'Recomendación emitida', 'Notificada al intercesor', 'En negociación', 'Finalizada'],
    default: 'Creada'
  })
  estado: string;

  @Prop({ type:Object, required: true })
  datosBasicos: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
  };

  @Prop({ type:Object, required: true })
  antecedentes: {
    aceptoTyC: boolean;
    certificadoNoAfiliacion: boolean;
    cartolaRSH: boolean;
    certificadoFonasa: boolean;
    certificadoRND: boolean;
    certificadoAntecedentes: boolean;
    boletinComercial: boolean;
  };

  @Prop()
  contexto?: string;

  @Prop()
  recomendacion?: string;

  @Prop({default: 'Curador Vital' })
    intercesorAsignado?: string;
}

export const SolicitudProteccionSchema = SchemaFactory.createForClass(SolicitudProteccion);