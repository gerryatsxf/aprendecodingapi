import { IsArray, IsIn, IsOptional, IsString, IsEmail } from 'class-validator';

export class Availability {
  @IsOptional()
  @IsString()
  id: string | null;

  @IsArray()
  @IsIn(
    [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    { each: true },
  )
  days: string[];

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  timezone: string;

  @IsEmail()
  email: string;
}
