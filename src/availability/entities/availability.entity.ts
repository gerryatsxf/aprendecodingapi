import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { HoomanWorkSlotDto } from "../dto/work-slot.dto";

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
  startTime: number;

  @IsString()
  endTime: number;

  startDateTime: Date;
  endDateTime: Date;


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
  @Type(() => HoomanWorkSlotDto)
  workSlots: HoomanWorkSlotDto[];
}
