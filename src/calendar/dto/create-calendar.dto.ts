import { ApiProperty } from '@nestjs/swagger';
import {
  //IsNumber,
  //IsPositive,
  IsString,
  //Min,
  //ValidateIf,
} from 'class-validator';
export class CreateCalendarDto {
  @IsString()
  @ApiProperty({
    type: 'string',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
  })
  description: string;
}
