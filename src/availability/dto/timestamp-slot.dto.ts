import { IsIn, IsString } from 'class-validator';

export class TimestampSlotDto {
  @IsString()
  @IsIn([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ])
  day: string;

  @IsString()
  localTimezoneDate: string;

  @IsString()
  startTime: number;

  @IsString()
  endTime: number;
}
