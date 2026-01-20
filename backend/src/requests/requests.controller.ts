import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('solicitudes')
export class RequestsController {
  constructor(private readonly service: RequestsService) {}

  // CU1: Crear solicitud
  @Post()
  crearSolicitud(@Body() datos: any) {
    return this.service.crearSolicitud(datos);
  }

  // Listar solicitudes
  @Get()
  listar() {
    return this.service.listarSolicitudes();
  }

  // Obtener solicitud específica
  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.service.obtenerSolicitud(id);
  }

  // Actualizar estado
  @Patch(':id/estado')
  actualizarEstado(
    @Param('id') id: string, 
    @Body() body: { estado: string }
  ) {
    return this.service.actualizarEstado(id, body.estado);
  }

  // CU2: Crear negociación
  @Post(':id/negociaciones')
  crearNegociacion(
    @Param('id') solicitudId: string,
    @Body() datos: any
  ) {
    return this.service.crearNegociacion(solicitudId, datos);
  }

  // Obtener negociaciones
  @Get(':id/negociaciones')
  obtenerNegociaciones(@Param('id') solicitudId: string) {
    return this.service.obtenerNegociaciones(solicitudId);
  }

  // Registrar respuesta
  @Patch('negociaciones/:negId/respuesta')
  registrarRespuesta(
    @Param('negId') negociacionId: string,
    @Body() body: { respuesta: string; aceptada: boolean }
  ) {
    return this.service.registrarRespuestaProveedor(
      negociacionId,
      body.respuesta,
      body.aceptada
    );
  }
}