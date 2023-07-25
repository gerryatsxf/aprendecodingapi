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
  guestMeetingDay: string;

  @IsString()
  guestMeetingDate: string;

  @IsString()
  guestMeetingStartTime: string;

  @IsNumber()
  meetingStartTime: number;
}
