import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn([
    'Creada',
    'En revisión',
    'Requiere aclaración',
    'Revisión completada',
    'Recomendación emitida',
    'Notificada al Intercesor',
    'En negociación',
    'Finalizada',
  ])
  estado!: string;
}