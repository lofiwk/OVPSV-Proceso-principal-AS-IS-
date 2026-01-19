import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types } from "mongoose";

export type NegociacionDocument = Negociacion & Document;

@Schema({ timestamps: true })
export class Negociacion {
    @Prop({ type: Types.ObjectId, ref: 'SolicitudProteccion', required: true })
    solicitudProteccionId: Types.ObjectId;

    @Prop({ required: true })
    intercesor: string;

    @Prop({
        type: String,
        enum: ['En espera', 'Respondida', 'Aceptada', 'Rechazada', 'Escalada'],
        default: 'En espera'
    })
    estadoNegociacion: string;

    @Prop({ required: true })
    propuestaEnviada: string; //Texto de la propuesta enviada por el intercesor.

    @Prop()
    respuestaProveedor?: string;

    @Prop({ default: 1 })
    numeroIntento: number; //Maximo 3 intentos.

    @Prop({ type: Date })
    fechaEnvio: Date;

    @Prop({ type: Date })
    fechaRespuesta?: Date;
}

export const NegociacionSchema = SchemaFactory.createForClass(Negociacion);