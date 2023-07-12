import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsEmail,
  ValidateNested,
} from 'class-validator';

export class WorkSlot {
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
  startTime: string;

  @IsString()
  endTime: string;
}

export class Availability {
  @IsOptional()
  @IsString()
  id: string | null;

  @IsString()
  timezone: string;

  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => WorkSlot)
  workSlots: WorkSlot[];
}
