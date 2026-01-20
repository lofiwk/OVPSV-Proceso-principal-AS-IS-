import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

import {
  SolicitudProteccion,
  SolicitudProteccionSchema,
} from './schemas/solicitud-proteccion.schema';

import {
  Negociacion,
  NegociacionSchema,
} from './schemas/negociacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SolicitudProteccion.name, schema: SolicitudProteccionSchema },
      { name: Negociacion.name, schema: NegociacionSchema },
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}