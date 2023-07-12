import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimeSlot {
  @IsString()
  object: string;

  @IsString()
  status: string;

  @IsNumber()
  startTime: number;

  @IsNumber()
  endTime: number;
}

export class NylasFreeBusy {
  @IsString()
  object: string;

  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => TimeSlot)
  timeSlots: TimeSlot[];
}
