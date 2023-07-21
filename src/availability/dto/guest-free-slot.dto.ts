import { IsIn, IsNumber, IsString } from 'class-validator';

export class GuestFreeSlotDto {
  @IsString()
  @IsIn([
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
  ])
  guestDay: string;

  @IsString()
  guestDate: string;

  @IsString()
  guestStartTime: string;

  @IsNumber()
  startTime: number;
}
